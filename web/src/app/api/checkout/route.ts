import Stripe from "stripe";
import { NextResponse } from "next/server";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16"
});

export async function POST(request: Request, response: Response) {
  const { title, price, quantity, customerId } = await request.json();


  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: title,
            },
            unit_amount: price,
          },
          quantity: quantity,
        },
      ],
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
    return NextResponse.json({ message: err.message });
  }
}
