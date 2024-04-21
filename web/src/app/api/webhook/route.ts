import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "../../../../lib/prismadb";

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
        // console.log("metadata情報", metadata);
        // トランザクション
        await prisma.$transaction(async (prisma) => {
          //商品の在庫更新
          await prisma.items.update({
            where: { id: Number(metadata.productId) },
            data: { inventory: Number(metadata.inventory) },
          })
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
        console.log("session.customer_details", session.customer_details);
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

          const customer = await prisma.customer.findFirst({
            where: { 
              AND: [
                {email: email as string},
                {country: shippingDetails?.country},
                {postal_code: shippingDetails?.postal_code},
                {city: shippingDetails?.city},
                {state: shippingDetails?.state},
                {line1: shippingDetails?.line1},
                {line2: shippingDetails?.line2},
              ]
            }
          });
          //購入履歴
          console.log("既存customer", customer);
          // いなければ
          if (!customer) {
            await prisma.customer.create({
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
          }
          //購入履歴
          if(customer){
            await prisma.purchase.create({
              data: {
                customerId: customer.id as string,
                itemId: Number(metadata!.productId),
              },
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
      status: 400,
    });
  }
}
