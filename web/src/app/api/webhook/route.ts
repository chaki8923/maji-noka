import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../lib/prismadb";
import nodemailer from "nodemailer";
import { CustomerService } from './customerServiceHook';

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
        break;
      }
      case "checkout.session.completed": {
        const session: Stripe.Checkout.Session = event.data.object;
        const shippingDetails = session.customer_details?.address;
        const name = session.customer_details?.name;
        const email = session.customer_details?.email;
        const metadata = session.metadata;
        var itemsArray = JSON.parse(metadata!.items);
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
            let purchaseCustomer: any;
            await prisma.$transaction(async (prisma) => {

              const customerService = new CustomerService(prisma);
              purchaseCustomer = await customerService.handleCustomer({
                customer: customer,
                session: session,
                name: name,
                email: email,
                shippingDetails: shippingDetails
              });

              // Promiseの配列を生成
              var promises = itemsArray.map(async function (item: any) {
                await prisma.purchase.create({
                  data: {
                    customerId: purchaseCustomer.id as string,
                    itemId: Number(item.productId),
                    quantity: Number(item.quantity),
                  },
                });

                const itemId = item.productId; // 商品IDを取得
                // 商品情報を取得
                const itemData = await prisma.items.findUnique({
                  where: { id: itemId },
                });
                console.log("更新前アイテム", itemData);
                // 在庫を更新
                await prisma.items.update({
                  where: { id: itemId },
                  data: { inventory: Number(itemData?.inventory) - item.quantity },
                });

              });

              // Promise.all()で非同期処理を待機
              await Promise.all(promises);
            });
          } catch (error) {
            const errorMailOptions = {
              from: `田中本気農家<${process.env.GMAILUSER}>`,
              to: process.env.GMAILUSER,
              subject: "購入情報更新時にエラーが発生しました",
              text: `購入情報をstripeで直接確認してください。エラーを確認してください=>${error}`,
            };
            // const info = await transporter.sendMail(errorMailOptions);
            console.error("トランザクションエラー", error);
          } finally {
            await prisma.$connect();
          }

          // メール本文の初期化
          var mailText = "商品が購入されました！\n\n";

          // 各商品のタイトルをメール本文に追加
          itemsArray.forEach(function (item: any) {
            mailText += `${item.title}\n`; // 各商品のタイトルを追加
          });

          // 最後に注文情報のURLを追加
          mailText +=
            `\n注文情報をご確認ください=>${process.env.NEXT_PUBLIC_BASE_URL}/purchase/index`;

          var now = new Date();
          var hours = now.getHours(); // 時を取得
          var minutes = now.getMinutes(); // 分を取得
          var seconds = now.getSeconds(); // 秒を取得

          var shoppingTime = hours + ":" + minutes + ":" + seconds
          var customerMailText = `----------------------------------------------------------------------
          このメールはお客様の注文に関する大切なメールです。
          お取引が完了するまで保存してください。
          ----------------------------------------------------------------------
          ${name}様

          田中本気農家です。
          ご注文いただきまして誠にありがとうございます。

          お客様のご注文を下記の内容で承りました。
          商品が発送された際にもメールを送信させていただきます。

          ■ご注文明細

          [日時]${shoppingTime}
          [注文者] ${name} 様
          --------------------------------
          [送付先] ${name} 様
                〒${shippingDetails?.postal_code!} ${shippingDetails?.state!} ${shippingDetails?.line1!} ${shippingDetails?.line2!}
          [商品]\n`

          // 各商品のタイトルをメール本文に追加
          itemsArray.forEach(function (item: any) {
            customerMailText += `${item.title}\n`; // 各商品のタイトルを追加
          });



          let totalPrice = itemsArray.reduce(function (sum: number, item: any) {
            return sum + item.price;
          }, 0); // 初期値を0に設定

          var postageTotalPrice = totalPrice + itemsArray[0].postage
          customerMailText += `
          ****************************************************************
          合計商品数   ${itemsArray.length}(個)
          商品価格計(税込) ${totalPrice.toLocaleString()}(円)
          --------------------------------
          商品小計(税込)   ${totalPrice.toLocaleString()}(円)
          送料(税込)   ${itemsArray[0].postage}(円)
          ----------------------------------------------------------------
          お支払い金額(税込)   ${postageTotalPrice.toLocaleString()}(円)
          ----------------------------------------------------------------
                    `

          const adminMailOptions = {
            from: `田中本気農家<${process.env.GMAILUSER}>`,
            to: process.env.GMAILUSER,
            subject: "商品が購入されました！",
            text: mailText,
          };
          const customerMailOptions = {
            from: `田中本気農家<${process.env.GMAILUSER}>`,
            to: email as string,
            subject: "商品のご購入ありがとうございます！",
            text: customerMailText,
          };

          try {
            const sendMail1 = await new Promise((resolve, reject) => {
              transporter.sendMail(adminMailOptions, (error, info) => {
                if (error) {
                  reject(error); // エラーが発生した場合
                } else {
                  resolve(info); // 成功した場合
                }
              });
            });
          
            const sendMail2 = await new Promise((resolve, reject) => {
              transporter.sendMail(customerMailOptions, (error, info) => {
                if (error) {
                  reject(error); // エラーが発生した場合
                } else {
                  resolve(info); // 成功した場合
                }
              });
            });
          
            console.log("Email sent:", sendMail1);
            console.log("Email sent:", sendMail2);
          
          } catch (error) {
            console.log("Email sent Error: ", error);
            return NextResponse.json({
              error_message: "メール送信失敗",
            });
          }
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
