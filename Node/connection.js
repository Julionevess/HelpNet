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
        console.log('register', "ok");
        connection.connect(function(err) {
            if (err) {
              console.error('error connecting: ' + err.stack);
              return;
            }
            console.log('connected as id ' + connection.threadId);
          });

          connection.getConnection(function(err, conn) {
            conn.beginTransaction(function(err){
              console.log("iniciou transação");
              if (err) { 
                console.log("Erro...");
                throw err; }
                conn.registerOS(os, function(err, rows, fields){
                console.log('OS Registrada', JSON.stringify(rows));
                res.send(rows);
                if (err){
                  console.log("Fazendo roolback");
                  conn.rollback(function(){
                    throw err;
                  });
                }else{
                  var event = model.event;
                  event.event.osId = res.id;
                  conn.createEvent(event, function(err, rows, fields){
                    console.log('Evento Criado: ', JSON.stringify(rows));
      
                    conn.commit(function(err) {
                      if (err) { 
                        conn.rollback(function() {
                          throw err;
                        });
                      }
                      console.log('success!');
                    });
      
                    });     
                  }
              });
            });
        });


            var sql = util.format('INSERT INTO OS (NUMERO, DATA_ABERTURA, CLIENTE_ID, PROBLEMA_ID, DETALHES, SITUACAO_ID, PROVEDOR_ID) VALUES (%s, NOW(), %s, %s, \'%s\', 1, %s)', model.number, model.clienteId, model.problemId, model.details, model.providerId);
            this.runQuery(sql, callback.bind(this));
            Console.log("cal = " + callback);
            /*
            var event = model.event;
            this.createEvent(event, function(err, rows, fields){
                console.log('Evento Criado: ', JSON.stringify(rows));
                });
                */
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


