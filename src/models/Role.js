const Sequelize = require("sequelize");
const db = require("../config/db");
const Usuarios = require("./User");
const Roles = db.define("Roles", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING(60),
  },
});

Roles.belongsToMany(Usuarios, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
module.exports = Roles;
