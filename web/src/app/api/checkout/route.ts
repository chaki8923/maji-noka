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
      quantity: item.quantity
    })
  );
   // 送料を別のline_itemとして追加
   const postage = checkoutAry.reduce((total: number, item: LineItem) => total + (item.postage || 0), 0); // postageの合計を計算
   if (postage > 0) {
     line_items.push({
       price_data: {
         currency: "jpy",
         product_data: {
           name: "送料", // 送料の名前
         },
         unit_amount: postage, // 合計送料
       },
       quantity: 1,
     });
   }
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
        })
      ))
      },
      shipping_address_collection: {
        allowed_countries: ["JP"],
      },
      mode: "payment",
      success_url: `https://web.maji-noka.com/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://web.maji-noka.com`,
    });
    return NextResponse.json({
      checkout_url: session.url,
    });
  } catch (err: any) {
    console.log("決済エラー！", err.message);
    return NextResponse.json({ message: err.message });
  }
}
