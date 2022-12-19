// new SELECT SQL
// const userGETSQL = "SELECT count(*) FROM menu";
// const userGETSQL1 = "call ShowMenuInfo('', 'location', 0, 100);";
// const userGETSQL2 = "CALL ShowDishOfMenu(26698)";
// const userGETSQL3 = "CALL ShowDishOfMenu(26698)";

// connection.query(userGETSQL1, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });

// connection.end();

// Entry Point of the API Server

const express = require("express");

/* Creates an Express application.
The express() function is a top-level
function exported by the express module.
*/
const app = express();
const mysql = require("mysql2");

// connection configration
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Syx2yx!!",
  database: "cs615FinalProject",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

/* To handle the HTTP Methods Body Parser
is used, Generally used to extract the
entire body portion of an incoming
request stream and exposes it on req.body
*/
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/showMenuInfo", (req, res, next) => {
  console.log("TEST DATA :");
  //   con.query("call ShowMenuInfo('', 'location', 0, 100)").then((testData) => {
  //     console.log(testData);
  //     // res.send(testData.rows);
  //   });
  const query = "call ShowMenuInfo('', 'location', 0, 100)";
  con.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.send(results.rows);
  });
});

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});
