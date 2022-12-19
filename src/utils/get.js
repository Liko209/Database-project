import mysql from "mysql";

// connection configration
var connection = mysql.createConnection({
	host: "localhost",
	user: "me",
	password: "secret",
	database: "my_db",
});

connection.connect();

// new SELECT SQL
const userGETSQL = "SELECT * FROM xxx";

connection.query(userGETSQL, function (error, results, fields) {
	if (error) throw error;
	console.log(results);
});

connection.end();
