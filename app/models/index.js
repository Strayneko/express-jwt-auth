import config from "../config/db.config.js";
import { Sequelize } from "sequelize";
import RoleModel from "./role.model.js";
import UserModel from "./user.model.js";
import CustomerModel from "./customer.model.js";

const sequelize = new Sequelize(config.DB_NAME, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: config.pool,
  port: config.PORT,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);
db.customer = CustomerModel(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin", "moderator"];

export default db;
