import axios from "axios";

export class ProductSummarySDK {
  constructor(private baseUrl: string) {}

  async getProducts(limit?: number, cursor?: string) {
    const res = await axios.get(`${this.baseUrl}/products`, {
      params: { limit, cursor }
    });
    return res.data;
  }

  async getProductById(id: string) {
    const res = await axios.get(`${this.baseUrl}/products/${id}`);
    return res.data;
  }

  async getStats() {
    const res = await axios.get(`${this.baseUrl}/api-stats`);
    return res.data;
  }
}
