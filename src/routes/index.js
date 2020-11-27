const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/userController");
const authController = require("../controllers/authController");

//importar express-validator
//const { body } = require("express-validator/check");

module.exports = function () {
  // Crear nueva cuenta
  router.get("/register");
  router.post("/register", usuariosController.crearCuenta);
  //router.get("/confirmar/:correo", usuariosController.confirmarCuenta);

  // iniciar sesión
  router.get("/login");
  router.post("/login", authController.autenticarUsuario);

  // cerrar sesion
  router.get("/logout");

  //retornar usuarios
  router.get("/users");

  //home
  router.get("/");

  // reestablecer contraseña
  //router.get("/reestablecer", usuariosController.formRestablecerPassword);
  //router.post("/reestablecer", authController.enviarToken);
  //router.get("/reestablecer/:token", authController.validarToken);
  //router.post("/reestablecer/:token", authController.actualizarPassword);
  return router;
};
