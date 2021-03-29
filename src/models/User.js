const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const Roles = require("./Role");
const Usuarios = db.define(
  "Usuarios",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Agrega un Correo Válido",
        },
        notEmpty: {
          msg: "El e-mail no puede ir vacio",
        },
      },
      unique: {
        args: true,
        msg: "Usuario Ya Registrado",
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El password no puede ir vacio",
        },
      },
    },
    activo: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nombre_social: { type: Sequelize.STRING, allowNull: false },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE,
  },

  {
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(
          usuario.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);

// Métodos personalizados
Usuarios.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Usuarios.belongsToMany(Roles, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
module.exports = Usuarios;
