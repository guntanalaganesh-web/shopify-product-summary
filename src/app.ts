import express from "express";
import productsRoutes from "./routes/products.routes";
import statsRoutes from "./routes/stats.routes";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "Shopify Product Summary Microservice"
  });
});

app.use("/products", productsRoutes);
app.use("/api-stats", statsRoutes);

export default app;
