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
  if (method === "GET") {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });
    return res.status(200).json({ products });
  } else if (method === "POST") {
  } else {
    return res.status(400).json({
      message: "Method not allowed",
    });
  }
}

type Data = {
  products?: Stripe.Response<Stripe.ApiList<Stripe.Product>>;
  message?: string;
};
