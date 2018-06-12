var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var expressSession = require('express-session');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var http = require('http');
var connection = require('./connection');

var app = express();
var router = express.Router();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

/*
app.use(expressSession({secret: 'minhaChaveSecreta'}));
app.use(passport.initialize());
app.use(passport.session());

var os  = {number:'2018051401',  clienteId: 1, problemId: 2, details: 'meu problem é ...'};

var os  = {number:'2018051401',clienteId:1,problemId:2,details:'meu problem é ...',event:{osId:8,technicalId:2,title:'titulo',description:'descrição...'}};

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hi everybody!');
  });

  //server.listen(3000);
  





connection.associateTechnical(associar, function(err, rows, fields){
  console.log('3. Leitura executada!', JSON.stringify(rows));
  });



app.use('/', indexRouter);
app.use('/users', usersRouter);

router.get('/version', function(req, res, next) {
  res.render('index', { title: 'Version_20180515' });
});

*/

/*
// API
*/

app.get('/', (req, res) => {
  res.send('HelpNet - Webservice alive! Ready to work.');
});

app.get('/version', (req, res) => {
  res.send('Version_20180612_2');
});

app.get('/listSituationsOs', (req, res) => {
  connection.listSituations(function (err, rows, fields) {
    res.send(JSON.stringify(rows));
  });
});

app.get('/listProblems', (req, res) => {
  connection.listProblems(function (err, rows, fields) {
    res.send(JSON.stringify(rows));
  });
});

app.get('/listOS', (req, res) => {
  var providerId = req.query.providerId;
  console.log(providerId);
  connection.listOS(providerId, function (err, rows, fields) {
    console.log('Lista Carregada.', "ok");
    res.send(JSON.stringify(rows));
  });
});

app.get('/listOSBySituation', (req, res) => {
  var providerId = req.query.providerId;
  var situationId = req.query.situationId;
  console.log(providerId);
  console.log(situationId);
  connection.listOSBySituation(providerId, situationId, function (err, rows, fields) {
    console.log('Lista Carregada.', "ok");
    res.send(JSON.stringify(rows));
  });
});


app.post('/registerOS', (req, res) => {
  console.log("iniciou transação");
  var os = req.body;
  connection.registerOS(os, function (err, rows, fields) {
    console.log('Lista Carregada.', "ok");
    res.send(JSON.stringify(rows));
  });
});


app.post('/associateTechnical', (req, res) => {
  var os = req.body;
  console.log(os);
  connection.associateTechnical(os, function (err, rows, fields) {
    console.log('Técnico associado', JSON.stringify(rows));
    res.send(JSON.stringify(rows));
  });
});

/*

*/
app.post('/changeSituationOS', (req, res) => {
  var object = req.body;
  connection.changeSituationOS(object, function (err, rows, fields) {
    console.log('Técnico associado', JSON.stringify(rows));
    res.send(JSON.stringify(rows));
  });
});





/*
// testar
*/
app.listen(8081, function () {
  console.log("Server is Up");
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
