import axios from "axios";
import { recordShopifyCall } from "./stats.service";

const client = axios.create({
  baseURL: `https://${process.env.SHOPIFY_SHOP}/admin/api/2024-01/graphql.json`,
  headers: {
    "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_TOKEN!,
    "Content-Type": "application/json"
  }
});

export async function shopifyQuery<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const start = Date.now();

  const res = await client.post("", {
    query,
    variables
  });

  recordShopifyCall(Date.now() - start);

  return res.data.data;
}
