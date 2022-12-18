import express from "express";
import bodyParser from "body-parser";
import db from "./app/models/index.js";
import cors from "cors";
import { authRoutes } from "./app/routes/auth.routes.js";
import { userRoutes } from "./app/routes/user.routes.js";

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: `http://127.0.0.1:${port}`
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
authRoutes(app);
userRoutes(app);

const Role = db.role;
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

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.info(`Server started at ${port}`));
