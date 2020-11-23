const { Router } = require("express");
const router = Router();
const { login, register } = require("../controllers/user");
// test route
router.get("/", function (req, res) {
  res.json({ message: "ruta raiz que muestra que esta bien" });
});

//route to handle user registration
router.post("/register", register);
router.post("/login", login);

module.exports = router;
