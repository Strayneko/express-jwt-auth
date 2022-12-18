import authJwt from "../middleware/authJwt.js";
import * as controller from "../controllers/customer.controller.js";

export const customerRoutes = app => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/customer/all", controller.listCustomer);
  app.post("/api/customer/create", controller.createCustomer);
  app.delete("/api/customer/destroy", controller.deleteCustomer);
};
