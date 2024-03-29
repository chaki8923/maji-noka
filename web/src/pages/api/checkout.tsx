import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, price, productId, quantity } = req.body;
  console.log("注文個数",quantity);
  
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: "jpy",
              product_data: {
                name: title,
              },
              unit_amount: price,
            },
            quantity: quantity
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}`,
      });

      return res.status(200).json({
        checkout_url: session.url,
      });
    } catch (err: any) {      
      return res.status(500).json({ message: err.message });
    }
  }
}