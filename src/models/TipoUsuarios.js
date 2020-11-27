const Sequelize = require("sequelize");
const db = require("../config/db");
const TipoUsuarios = db.define("tipousuario", {
  id_TipoUsuario: {
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
});
module.exports = TipoUsuarios;
/*
-- -----------------------------------------------------
-- Table `mydb`.`TipoUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`TipoUsuario` (
  `id_TipoUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_TipoUsuario`))

*/
