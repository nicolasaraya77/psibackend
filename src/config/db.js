const { Sequelize } = require("sequelize");

// Option 2: Passing parameters separately (other dialects)
const db = new Sequelize("mydb", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  operatorsAliases: false,
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
