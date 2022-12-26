import authJwt from "../middleware/authJwt.js";
import * as controller from "../controllers/product.controller.js";

export const productRoutes = app => {
  app.get("/api/product", [authJwt.verifyToken], controller.getProducts);
  app.get(
    "/api/product/:id",
    [authJwt.verifyToken],
    controller.getProductDetail
  );
  app.post("/api/product/create", controller.createProduct);
  app.delete(
    "/api/product/:id",
    [authJwt.verifyToken],
    controller.destroyProduct
  );
  app.put("/api/product/:id", [authJwt.verifyToken], controller.updateProduct);
};
