/* const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  //leer el token del header
  const token = req.header("x-auth-header");

  //revisar si no existe token
  if (!token) {
    return res.status(401).json({ msg: "no hay Token, acceso denegado" });
  }

  //validar token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no valido" });
  }
};
*/
