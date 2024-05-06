import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../lib/prismadb";
import nodemailer from "nodemailer";

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  // リクエストの検証
  const body = await req.text();
  const sig = headers().get("Stripe-Signature");
  let event: Stripe.Event;
  try {
    if (!sig) throw new Error("No signature");
    event = stripe.webhooks.constructEvent(body, sig, stripeWebhookSecret);
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Bad Request");
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  // イベントの処理
  try {
    switch (event.type) {
      case "customer.updated": {
        const metadata = event.data.object.metadata;
        console.log("metadata情報", metadata);
        // トランザクション
        await prisma.$transaction(async (prisma) => {
          //商品の在庫更新
          await prisma.items.update({
            where: { id: Number(metadata.productId) },
            data: { inventory: Number(metadata.inventory) },
          });
        });

        break;
      }
      case "checkout.session.completed": {
        const session: Stripe.Checkout.Session = event.data.object;
        const shippingDetails = session.customer_details?.address;
        const name = session.customer_details?.name;
        const email = session.customer_details?.email;
        const metadata = session.metadata;
        console.log("metadata", metadata!.productId);
        console.log("session", session);
        if (shippingDetails !== null) {
          // stripeに保存
          await stripe.customers.update(session.customer as string, {
            shipping: {
              name: "Address",
              address: {
                country: shippingDetails?.country!,
                postal_code: shippingDetails?.postal_code!,
                city: shippingDetails?.city!,
                state: shippingDetails?.state!,
                line1: shippingDetails?.line1!,
                line2: shippingDetails?.line2!,
              },
            },
          });

          //購入履歴
          console.log("customer_id", session.customer);
          // メール送信
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: process.env.MAJIUSER,
              pass: process.env.MAJIPASSWORD,
            },
          });
          try {
            const customer = await prisma.customer.findFirst({
              where: {
                email: email as string,
              },
            });
            console.log("既存カスタマー", customer);
            let purchaseCustomer;
            await prisma.$transaction(async (prisma) => {
              if (!customer) {
                purchaseCustomer = await prisma.customer.create({
                  data: {
                    customerId: session.customer as string,
                    name: name,
                    email: email,
                    country: shippingDetails?.country,
                    postal_code: shippingDetails?.postal_code,
                    city: shippingDetails?.city,
                    state: shippingDetails?.state,
                    line1: shippingDetails?.line1,
                    line2: shippingDetails?.line2,
                  },
                });
              } else {
                purchaseCustomer = await prisma.customer.update({
                  where: { email: email as string },
                  data: {
                    name: name,
                    country: shippingDetails?.country,
                    postal_code: shippingDetails?.postal_code,
                    city: shippingDetails?.city,
                    state: shippingDetails?.state,
                    line1: shippingDetails?.line1,
                    line2: shippingDetails?.line2,
                  },
                });
              }
              //購入履歴
              await prisma.purchase.create({
                data: {
                  customerId: purchaseCustomer.id as string,
                  itemId: Number(metadata!.productId),
                  quantity: Number(metadata!.quantity),
                },
              });
            });
          } catch (error) {
            const errorMailOptions = {
              from: `田中本気農家<${process.env.GMAILUSER}>`,
              to: process.env.GMAILUSER,
              subject: "購入情報更新時にエラーが発生しました",
              text: `購入情報をstripeで直接確認してください。エラーを確認してください=>${error}`,
            };
            const info = await transporter.sendMail(errorMailOptions);
            console.log("Email sent: " + info.response);
            console.error("トランザクションエラー", error);
          } finally {
            await prisma.$connect();
          }

          const adminMailOptions = {
            from: `田中本気農家<${process.env.GMAILUSER}>`,
            to: process.env.GMAILUSER,
            subject: "商品が購入されました！",
            text: `商品が購入されました！\n\n「商品名」${metadata!.title}\n\n注文情報をご確認ください=>http://localhost3001/purchase/index`,
          };
          const customerMailOptions = {
            from: `田中本気農家<${process.env.GMAILUSER}>`,
            to: email as string,
            subject: "商品のご購入ありがとうございます！",
            text: `商品が購入されました！\n\n「商品名」${metadata!.title}`,
          };

          // Promise.all([mailer.sendMail(mailOptions1), mailer.sendMail(mailOptions2)])
          Promise.all([
            // transporter.sendMail(adminMailOptions),
            // transporter.sendMail(customerMailOptions),
          ])
            .then((respose) => {
              console.log("Email sent: " + respose);
            })
            .catch((error) => {
              console.log("Email sent Error: " + error);
              return NextResponse.json({
                error_message: "メール送信失敗",
              });
            });
        }

        break;
      }
    }
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("イベントのハンドルに失敗しました", {
      status: 500,
    });
  }
}
