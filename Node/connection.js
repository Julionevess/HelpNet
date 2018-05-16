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
    registerOS: function registerOS(model, callback) {    
            var sql = util.format('INSERT INTO OS (NUMERO, DATA_ABERTURA, CLIENTE_ID, PROBLEMA_ID, DETALHES, SITUACAO_ID) VALUES (%s, NOW(),%s, %s, \'%s\', 1)', model.number, model.clienteId, model.problemId, model.details);
            this.runQuery(sql, callback.bind(this));

            var event = model.event;
            this.createEvent(event, function(err, rows, fields){
                console.log('Evento Criado: ', JSON.stringify(rows));
                });
    },
    
    //
    // READ
    //
    listOS: function listOS(callback) {
        //this.openConnection();
            var sql = 'select * from os';
            this.runQuery(sql, callback.bind(this));
        //this.closeConnection();
    },

    //
    // READ
    //
    listOSBySituation: function listOSBySituation(object, callback) {
            var sql = util.format('select * from os WHERE SITUACAO_ID = %d', object.situationId);
            this.runQuery(sql, callback.bind(this));
    },

    //
    // Associate Technical
    //
    associateTechnical: function associateTechnical(model, callback) { 
        console.log(model);
            var sql = util.format('UPDATE OS set TECNICO_RESPONSAVEL_ID = %s where id = %s', model.technicalId, model.osId);
            this.runQuery(sql, callback.bind(this));
        
            var event = model.event;
            this.createEvent(event, function(err, rows, fields){
                console.log('Tecnico associado a OS: ', JSON.stringify(rows));
            });        
    },

    //
    // Finished OS
    //
    changeSituationOS: function changeSituationOS(model, callback) {     
            var sql = util.format('UPDATE OS set SITUACAO_ID = %s where id = %s', object.situationId, object.osId);
            this.runQuery(sql, callback.bind(this));

            var event = model.event;
            this.createEvent(event, function(err, rows, fields){
                console.log('Evento Criado: ', JSON.stringify(rows));
            });
    },

    //
    // CREATE EVENT
    //
    createEvent: function createEvent(event, callback) {
               
        var sql = util.format('INSERT INTO evento (DATA_HORA, OS_ID, TIPO_EVENTO_ID, DESCRICAO, TECNICO_ID) VALUES (NOW(), %s, \'%s\',\'%s\', %s)', event.osId, event.tipoEventID, event.description, event.technicalId)
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


