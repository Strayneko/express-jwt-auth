import authJwt from "../middleware/authJwt.js";
import * as controller from "../controllers/product.controller.js";

export const productRoutes = app => {
  app.get("/api/product", controller.getProducts);
  app.post("/api/product/create", controller.createProduct);
};
