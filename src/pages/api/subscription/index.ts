// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51NPusrIvAiMblOMOEL9gZe04yPvWWIjB7RCNmWBOznvujl06bu21lTpbgmtLn0AL2t3yzEmVf7vhxJM0eDxl2pSr00qVMr51Ae",
  {
    apiVersion: "2022-11-15",
  }
);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  if (method === "POST") {
    try {
      const public_domain = process.env.NEXT_PUBLIC_DOMAIN as string;
      const { email, priceId } = req.body;
      const customers = await stripe.customers.list({ limit: 100 });
      const customer = customers.data.find((c) => c.email === email);
      const subscription = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        customer: customer?.id,
        success_url: `${public_domain}/success`,
        cancel_url: `${public_domain}/cancel`,
      });
      return res.status(200).json({ subscription });
    } catch (error) {
      const result = error as Error;
      return res.status(400).json({ message: result.message });
    }
  } else {
    return res.status(400).json({
      message: "Method not allowed",
    });
  }
}

type Data = {
  subscription?: Stripe.Response<Stripe.Checkout.Session>;
  message?: string;
};
