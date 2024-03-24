import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log("サーバー入ったpost!!", req.method)
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: "jpy",
              product_data: {
                name: "お米だよ",
              },
              unit_amount: 1200,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      return res.status(200).json({
        checkout_url: session.url,
      });
    } catch (err: any) {
      console.log("APIエラー");
      
      return res.status(500).json({ message: err.message });
    }
  }
}