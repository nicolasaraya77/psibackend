const pool = require("../database");

exports.getUsers = async function (req, res) {
  const { users } = pool.query("SELECT * FROM Usuario;");
  //res.json(users);
  console.log(res.json({ users }));
};
