// Entry Point of the API Server

const express = require("express");
const cors = require("cors");

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

// const con = mysql.createConnection({
//   host: "dbase.cs.jhu.edu",
//   user: "22fa_ysun122",
//   password: "2vBlIvqqs6",
//   database: "22fa_ysun122_db",
// });

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
app.use(cors());

app.get("/showMenuInfo", (req, res, next) => {
  console.log("showMenuInfo:");
  const params = req.query;
  console.log(params);
  const query = `CALL ShowMenuInfo('${params.searchKey}', '${params.orderBy}', ${params.startPos}, ${params.pageSize})`;
  con.query(query, function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.send(results);
  });
});

app.get("/showDishInfo", (req, res, next) => {
  console.log("showDishInfo:");
  const params = req.query;
  console.log(params);
  const query = `CALL ShowDishInfo('${params.searchKey}', '${params.orderBy}', ${params.startPos}, ${params.pageSize})`;
  //   const query = "call ShowDishInfo('', 'Mene', 0, 100);";
  con.query(query, function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.send(results);
  });
});

app.get("/showDishOfMenu", (req, res, next) => {
  console.log("showDishOfMenu:");
  const params = req.query;
  //   const params = { menuID: 31054 };
  console.log(params);
  const query = `CALL ShowDishOfMenu(${params.menuID})`;
  con.query(query, function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.send(results);
  });
});

app.get("/searchMenuByDish", (req, res, next) => {
  console.log("searchMenuByDish:");
  const params = req.query;
  console.log(params);
  const query = `CALL SearchMenuByDish('${params.searchKey}', '${params.orderBy}', ${params.startPos}, ${params.pageSize})`;
  con.query(query, function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.send(results);
  });
});

// Require the Routes API
// Create a Server and run it on the port 3000
const server = app.listen(3306, function () {
  let host = server.address().address;
  let port = server.address().port;
  // Starting the Server at the port 3000
});
