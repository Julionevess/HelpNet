var util      = require('util');  
var mysql      = require('mysql');

var connection = mysql.createConnection({  
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'helpnet'
  });

module.exports = {

    //
    // Conecta com o banco de dados
    //
    openConnection: function openConnection(){
        connection.connect();
    },

    //
    // Executa Query
    //
    runQuery: function runQuery(sql, callback) {
        connection.query(sql, function(err, rows, fields) {
          if (err){
            console.error(sql);
            throw err;
          }

          callback(err, rows, fields);
        });
    },

    //
    // CREATE
    //
    createOS: function createOS(model, callback) {
        this.openConnection();
        console.log("chegou aqui");
       
        console.log(model);
        console.log("Number = " + model.number);
            var sql = util.format('INSERT INTO OS (NUMERO, DATA_ABERTURA, CLIENTE_ID, PROBLEMA_ID, DETALHES, SITUACAO_ID) VALUES (%s, NOW(),%s, %s, \'%s\', 1)', model.number, model.clienteId, model.problemId, model.details);
            this.runQuery(sql, callback.bind(this));

            var event = model.event;
            this.createEvent(event, function(err, rows, fields){
                console.log('Evento Criado: ', JSON.stringify(rows));
                });
            

        this.closeConnection();
    },

    //
    // READ
    //
    readData: function readAllOS(callback) {
        var sql = 'select * from os';

        this.runQuery(sql, callback.bind(this));
    },


    //
    // UPDATE
    //
    associateTechnical: function associateTechnical(model, callback) {
        
        this.openConnection();

        var sql = util.format('UPDATE OS set TECNICO_RESPONSAVEL_ID = %s where id = %s', model.technicalId, model.id);
        this.runQuery(sql, callback.bind(this));
       
        var event = model.event;
        this.createEvent(event, function(err, rows, fields){
            console.log('Evento Criado: ', JSON.stringify(rows));
            });
        
        this.closeConnection();

    },

    createEvent: function createEvent(event, callback) {
               
        var sql = util.format('INSERT INTO evento (DATA_HORA, OS_ID, TITULO, DESCRICAO, TECNICO_ID) VALUES (NOW(), %s, \'%s\',\'%s\', %s)', event.osId, event.title, event.description, event.technicalId)
        this.runQuery(sql, callback.bind(this));
        

    },

    //
    // DELETE
    //
    deleteData: function deleteData(model, callback) {
        var sql = util.format('DELETE FROM `test`.`message` where id = %s', model.id);

        this.runQuery(sql, callback.bind(this));
    },

    //
    // CLOSE CONNECTION
    //
    closeConnection: function closeConnection(model, callback) {
        connection.end();
    }   
};


