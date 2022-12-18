import db from "../models/index.js";
import authConfig from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

export const signup = (req, res) => {
  // sa`ve` user to databse
  if (!req.body.username || !req.body.password || !req.body.email)
    res.status(403).send({ message: "Please fill all the required parameter" });
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          console.log({
            [Op.or]: req.body.roles
          });
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

export const signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) return res.status(404).send({ message: "User not found!" });

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400 // 24hours
      });

      const authorities = [];
      user.getRoles().then(roles => {
        for (let role of roles) {
          authorities.push(`ROLES_${role.name.toUpperCase()}`);
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
