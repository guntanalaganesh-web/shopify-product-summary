export interface Product {
  id: string;
  title: string;
  price: number;
  inventory: number;
  created_at: string;
}

export interface ProductListResponse {
  products: Product[];
  next_cursor: string | null;
}
