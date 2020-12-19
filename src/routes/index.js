const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send({
    code: 200,
    success: "Hello world! Successfully Authenticated",
  });
});

router.get("/login", async (req, res) => {
  try {
    var aux = req.isAuthenticated();

    res.json({ aux, token: req.query.secret_token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
});

module.exports = router;
