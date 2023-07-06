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
      const { email } = req.body;
      const customer = await stripe.customers.create({ email });
      return res.status(200).json({ message: "Success" });
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
  message?: string;
};
