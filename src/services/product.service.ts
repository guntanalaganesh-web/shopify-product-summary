import { getCache, setCache } from "../utils/cache";
import { shopifyQuery } from "./shopify.service";
import { Product, ProductListResponse } from "../types/product";

export async function getProducts(
  limit = 10,
  cursor?: string
): Promise<ProductListResponse> {
  const cacheKey = `products:${limit}:${cursor || "first"}`;
  const cached = await getCache<ProductListResponse>(cacheKey);
  if (cached) return cached;

  const query = `
    query ($first: Int!, $after: String) {
      products(first: $first, after: $after, sortKey: TITLE) {
        edges {
          cursor
          node {
            id
            title
            createdAt
            totalInventory
            variants(first: 1) {
              edges {
                node { price }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `;

  const data: any = await shopifyQuery(query, {
    first: limit,
    after: cursor
  });

  const response: ProductListResponse = {
    products: data.products.edges.map((e: any) => ({
      id: e.node.id,
      title: e.node.title,
      price: Number(e.node.variants.edges[0]?.node.price || 0),
      inventory: e.node.totalInventory,
      created_at: e.node.createdAt
    })),
    next_cursor: data.products.pageInfo.hasNextPage
      ? data.products.edges.at(-1).cursor
      : null
  };

  await setCache(cacheKey, response, 60);
  return response;
}

export async function getProductById(id: string): Promise<Product> {
  const cacheKey = `product:${id}`;
  const cached = await getCache<Product>(cacheKey);
  if (cached) return cached;

  const query = `
    query ($id: ID!) {
      product(id: $id) {
        id
        title
        createdAt
        totalInventory
        variants(first: 1) {
          edges {
            node { price }
          }
        }
      }
    }
  `;

  const data: any = await shopifyQuery(query, { id });

  const product: Product = {
    id: data.product.id,
    title: data.product.title,
    price: Number(data.product.variants.edges[0]?.node.price || 0),
    inventory: data.product.totalInventory,
    created_at: data.product.createdAt
  };

  await setCache(cacheKey, product, 120);
  return product;
}
