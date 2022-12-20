import authJwt from "../middleware/authJwt.js";
import * as controller from "../controllers/customer.controller.js";

export const customerRoutes = app => {
  app.use((req, res, next) => {
    // set response header
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // customer routes
  app.get("/api/customer/all", [authJwt.verifyToken], controller.listCustomer);
  app.post(
    "/api/customer/create",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.createCustomer
  );
  app.delete(
    "/api/customer/destroy",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.deleteCustomer
  );
  app.get(
    "/api/customer/detail/:customerId",
    [authJwt.verifyToken],
    controller.detailCustomer
  );
  app.put(
    "/api/customer/update/:customerId",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.updateCustomer
  );
};
