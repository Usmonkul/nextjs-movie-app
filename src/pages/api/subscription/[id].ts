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
  if (req.method === "GET") {
    const { id } = req.query;
    const customers = await stripe.customers.list({ limit: 100 });
    const customer = customers.data.find((c) => c.metadata.user_id === id);

    const subscription = await stripe.subscriptions.list({
      limit: 1,
      customer: customer?.id,
    });
    return res.status(200).json({ subscription });
  }
}

type Data = {
  subscription?: Stripe.Response<Stripe.ApiList<Stripe.Subscription>>;
  message?: string;
};
