import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger.json";
const endpoints = [
  "./app/routes/auth.routes.js",
  "./app/routes/customer.routes.js",
  "./app/routes/user.routes.js"
];

swaggerAutogen(outputFile, endpoints);
