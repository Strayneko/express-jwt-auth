import authJwt from "../middleware/authJwt.js";
import * as controller from "../controllers/order.controller.js";

export const orderRoutes = app => {
  //   app.get("/api/order", [authJwt.verifyToken], controller.getOrders);
  //   app.get("/api/order/:id", [authJwt.verifyToken], controller.getProductDetail);
  app.post("/api/order/create", controller.createOrder);
  app.delete("/api/order/:id", [authJwt.verifyToken], controller.destroyOrder);
};
