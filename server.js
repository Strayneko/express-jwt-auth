import express from "express";
import bodyParser from "body-parser";
import db from "./app/models/index.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { authRoutes } from "./app/routes/auth.routes.js";
import { userRoutes } from "./app/routes/user.routes.js";
import { customerRoutes } from "./app/routes/customer.routes.js";
import swaggerDocument from "./swagger.json" assert {type: 'json'}
import { productRoutes } from "./app/routes/product.routes.js";
import { orderRoutes } from "./app/routes/order.routes.js";


// initialize express
const app = express();
const port = 3000;

// initialize and set cors option
const corsOptions = {
  origin: `http://127.0.0.1:${port}`
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());


// initalize swagger ui 

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        requestInterceptor:  (request) => {
            request.headers.Origin = "http://127.0.0.1:3000";
            return request;
        },
        url: "http://127.0.0.1:3000/api/docs"
    }
}))
app.get('/', (req,res) => {
  res.send({
    message: "Welcome to Express API",
    data: {
      docs: corsOptions.origin + "/api/docs"
    }
  })
})
authRoutes(app);
userRoutes(app);
customerRoutes(app);
productRoutes(app)
orderRoutes(app)

const Role = db.role;

// seed role table
const initial = () => {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
};

// for developing
db.sequelize.sync({ force: true }).then(() => {
  console.info(`Drop and resync DB`);
  initial();
});
// for production
// db.sequelize.sync();

// use bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
// start local development server
app.listen(port, () => console.info(`Server started at ${port}`));
