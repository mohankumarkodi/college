const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "programmer",
  password: "password1",
  database: "college",
});

module.exports = connection;
