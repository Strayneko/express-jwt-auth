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
  app.get("/api/customer/all", [authJwt.verifyToken], controller.listCustomer);
  app.post(
    "/api/customer/create",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.createCustomer
  );
  app.delete(
    "/api/customer/destroy",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.deleteCustomer
  );
  app.get(
    "/api/customer/detail/:customerId",
    [authJwt.verifyToken],
    controller.detailCustomer
  );
  app.put(
    "/api/customer/update/:customerId",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.updateCustomer
  );
};
