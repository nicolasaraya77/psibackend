const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const TipoUsuarios = require("./TipoUsuarios");

const Usuarios = db.define(
  "usuarios",
  {
    id_usuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "el nombre no debe ser vacio",
        },
      },
    },
    nombre_social: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "el nombre social no debe ser vacio",
        },
      },
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
Usuarios.belongsTo(TipoUsuarios, { foreignKey: "TipoUsuario_id_TipoUsuario" });
module.exports = Usuarios;

/*

CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `id_Usuario` INT NOT NULL AUTO_INCREMENT,
  `TipoUsuario_id_TipoUsuario` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `nombre_social` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(225) NOT NULL,
  PRIMARY KEY (`id_Usuario`, `TipoUsuario_id_TipoUsuario`),
  INDEX `fk_Usuario_TipoUsuario1_idx` (`TipoUsuario_id_TipoUsuario` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_TipoUsuario1`
    FOREIGN KEY (`TipoUsuario_id_TipoUsuario`)
    REFERENCES `mydb`.`TipoUsuario` (`id_TipoUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

*/
