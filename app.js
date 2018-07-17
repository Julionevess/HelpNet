var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var expressSession = require("express-session");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var http = require("http");
var connection = require("./connection");
var dateTime = require("node-datetime");

var app = express();
var router = express.Router();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

function createOSNumber(providerId) {
  var dt = dateTime.create();
  var formatted = dt.format("Y-m-d H:M:S");
  var y = formatted.substring(2, 4);
  var month = formatted.substring(5, 7);
  var d = formatted.substring(8, 10);
  var h = formatted.substring(11, 13);
  var m = formatted.substring(14, 16);
  var s = formatted.substring(17, 19);

  return providerId + y + month + d + h + m + s;
}

app.get("/", (req, res) => {
  res.send(JSON.stringify("HelpNet DEV - Webservice alive! Ready to work."));
});

app.get("/api/version", (req, res) => {
  res.send(JSON.stringify("Version_20180717_by_uilton"));
});

app.get("/api/listSituationsOs", (req, res) => {
  connection.listSituations(function(err, rows, fields) {
    res.send(JSON.stringify(rows));
  });
});

app.get("/api/listProblems", (req, res) => {
  connection.listProblems(function(err, rows, fields) {
    res.send(JSON.stringify(rows));
  });
});

app.get("/api/listOS", (req, res) => {
  var providerId = req.query.providerId;
  connection.listOS(providerId, function(err, rows, fields) {
    console.log("Lista de OS Carregada.", "ok");
    res.send(JSON.stringify(rows));
  });
});

app.get("/api/listOSBySituation", (req, res) => {
  var providerId = req.query.providerId;
  var situationId = req.query.situationId;
  connection.listOSBySituation(providerId, situationId, function(
    err,
    rows,
    fields
  ) {
    console.log("Lista de situação Carregada.", "ok");
    res.send(JSON.stringify(rows));
  });
});

app.post("/api/registerOS", (req, res) => {
  var os = req.body;
  os.number = createOSNumber(os.providerId);
  connection.registerOS(os, function(err, rows, fields) {
    res.send(JSON.stringify(rows));
  });
});

app.post("/api/associateTechnical", (req, res) => {
  var os = req.body;
  connection.associateTechnical(os, function(err, rows, fields) {
    console.log("Técnico associado", JSON.stringify(rows));
    res.send(JSON.stringify(rows));
  });
});

/*

*/
app.post("/api/changeSituationOS", (req, res) => {
  var object = req.body;
  connection.changeSituationOS(object, function(err, rows, fields) {
    console.log("Mudança de situação", JSON.stringify(rows));
    res.send(JSON.stringify(rows));
  });
});

app.get("/api/provider", (req, res) => {
  var cpfCustomer = req.query.cpfCustomer;

  connection.getCustomer(cpfCustomer, function(err, result, fields) {
    if (result === "404") {
      res.status(404).send(JSON.stringify("Client not found!"));
    } else {
      const resultStr = JSON.stringify(result);
      res.send(resultStr);
    }
  });
});

app.get("/api/loadBaseCustomerFromProvider", (req, res) => {
  var providerID = req.query.providerID;
  console.log(providerID);

  connection.loadBaseCustomerFromProvider(providerID, function(
    err,
    rows,
    fields
  ) {
    res.send(JSON.stringify(rows));
  });
});

// DO NOT USE THIS API, IT'S JUST FOR TEST PURPOSES.
app.get("/api/listClients", (req, res) => {
  connection.listClients(function(err, rows, fields) {
    res.send(JSON.stringify(rows));
  });
});

/*
// testar
*/

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(8081, function() {
  console.log("Server is Up");
});

module.exports = app;
