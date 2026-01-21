import { Router } from "express";
import { getProducts, getProductById } from "../services/product.service";
import { recordEndpoint } from "../services/stats.service";

const router = Router();

router.get("/", async (req, res) => {
  const start = Date.now();
  const limit = Number(req.query.limit) || 10;
  const cursor = req.query.cursor as string | undefined;

  const data = await getProducts(limit, cursor);

  recordEndpoint(Date.now() - start);
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const start = Date.now();

  const data = await getProductById(req.params.id);

  recordEndpoint(Date.now() - start);
  res.json(data);
});

export default router;
