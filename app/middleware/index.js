import authJwt from "./authJwt.js";
import verifySignUp from "./verifySignUp.js";

const middlewares = {
  authJwt,
  verifySignUp,
};
export default middlewares;
