import Stripe from "stripe";
import { NextResponse } from "next/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request, response: Response) {

  const { checkoutAry } = await request.json();
  interface LineItem {
    title: string;
    price: number;
    quantity: number;
    description: number;
    images: string;
    postage: number;
  }
  console.log("checkoutAry>>>>>>>>", checkoutAry);
  
  try {
    const line_items = checkoutAry.map((item: LineItem) => ({
      price_data: {
        currency: "jpy",
        product_data: {
          name: item.title,
          images: [item.images],
          description: item.description,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: checkoutAry[0].customerId,
      line_items: [
       ...line_items
      ],
      // カード決済時の住所入力をstripeに任せます
      billing_address_collection: "auto",
      metadata: {
        items: JSON.stringify(checkoutAry.map((item: any) => ({
          productId: item.productId,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          postage: item.postage
        })))
      },
      shipping_address_collection: {
        allowed_countries: ["JP"],
      },
      mode: "payment",
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}`,
    });
    return NextResponse.json({
      checkout_url: session.url,
    });
  } catch (err: any) {
    console.log("決済エラー！", err.message);
    return NextResponse.json({ message: err.message });
  }
}
