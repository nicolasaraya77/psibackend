const { Router } = require("express");
const router = Router();
const { getUsers } = require("../controllers/user");

router.get("/users", getUsers);
module.exports = router;
