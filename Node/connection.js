var util   = require('util');
var mysql  = require('mysql');

//AWS
// var connection = mysql.createConnection({  
//     host     : 'helpnet.ccyhvv2orx1w.us-east-1.rds.amazonaws.com',
//     user     : 'admin',
//     password : 'h3lpn3ts',
//     database : 'helpnet'
// });

//HEROKU
/*
var connection = mysql.createConnection({  
    host     : 'lt80glfe2gj8p5n2.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user     : 'wnxoormb91xkfef9',
    password : 'qmwan6b8lamtbp9j',
    database : 's0xdx9gvx8au1ooc'
});
*/
//DEV
 var connection = mysql.createConnection({  
     host     : 'localhost',
     user     : 'admin',
     password : 'h3lpn3ts',
     database : 'helpnet'
 });

module.exports = {
       
    //
    // Executa Query quando não houver transação
    //
    runQuery: function runQuery(sql, callback) {
        connection.query(sql, function (err, rows, fields) {
            if (err) {
                console.error(sql);
                throw err;
            }                   
            callback(err, rows, fields);
        });
    },

    //
    // Listar todas as situações possiveis para uma OS 
    //
    listSituations: function listSituations(callback) {
        var sql = util.format('SELECT * FROM SITUACAO_OS');
        this.runQuery(sql, callback.bind(this));
    },

    getCustomer: function getCustomer(cpfCustomer, callback) { 
        

        var sql = util.format('SELECT * FROM provedor');
        connection.query(sql, function (err, result) {
            if (err) { 
                console.log("Ocorreu um erro na consulta do provedor");                    
            }else{

                var connectionProvider = mysql.createConnection({  
                    host     : result[0].BD_URL,
                    user     : result[0].BD_USUARIO,
                    password : result[0].BD_SENHA,
                    database : result[0].BD_NOME                    
                });

                var table = result[0].BD_TABLE    
                var provider = result[0];
            
                
                var sqlProvider = util.format('SELECT * FROM %s WHERE CPF = %s', table, cpfCustomer); 
                console.log(sqlProvider);           
                connectionProvider.query(sqlProvider, function (err, result) {
                    if (err) { 
                        console.log("Ocorreu um erro na consulta a base do cliente");                    
                    }else{
                        //provider.id = provider.ID;

                        var customer = result[0];

                        console.log("provider = " + provider.ID);
                        console.log("provider = " + provider.NOME);
                        console.log("customer = " + customer.ID);
                        console.log("provider = " + customer.NOME);
            
                    }                                                                
                });

            }
            /*
            // Este trecho deve ser removido
            */
            var sql = util.format('SELECT C.ID as CLIENTE_ID, C.NOME AS CLIENTE_NOME, C.CPF AS CLIENTE_CPF, P.ID AS PROVEDOR_ID, P.NOME AS PROVEDOR_NOME  from cliente as C, provedor as P WHERE C.CPF = %s', cpfCustomer);
            connection.query(sql, function (err, result) {
                if (err) { 
                    console.log("Ocorreu um erro na consulta a base do cliente");                    
                }                                                    
                callback(err, result);
            });

        });
    },

    //
    // Listar todas os problemas conhecidos que podem motivar uma abertura de OS 
    //
    listProblems: function listProblems(callback) {
        var sql = util.format('SELECT * FROM PROBLEMA_OS');
        this.runQuery(sql, callback.bind(this));
    },

    //
    // Listar todas as OS de um determinado provedor
    //
    listOS: function listOS(providerId, callback) {
        var sql = util.format('SELECT * FROM OS WHERE PROVEDOR_ID = %d', providerId);
        this.runQuery(sql, callback.bind(this));
    },
    
    //
    // Listar as OS de um determinado provedor, filtrnado pela situação 
    //
    listOSBySituation: function listOSBySituation(providerId, situationId, callback) {
        var sql = util.format('SELECT * FROM OS WHERE PROVEDOR_ID = %d AND SITUACAO_ID = %d', providerId, situationId);
        this.runQuery(sql, callback.bind(this));
    },
    
    //
    // Registra uma nova OS
    //
    registerOS: function registerOS(os, callback) {  

        connection.beginTransaction(function (err) {
            console.log("iniciou transação");
            if (err) { 
                console.log("Erro. Não foi possível iniciar transação..");
                throw err; 
            }           
            var sql = util.format('INSERT INTO OS (NUMERO, DATA_ABERTURA, CLIENTE_ID, PROBLEMA_ID, DETALHES, SITUACAO_ID, PROVEDOR_ID) VALUES (%s, NOW(), %s, %s, \'%s\', 1, %s)', os.number, os.clienteId, os.problemId, os.details, os.providerId);
            connection.query(sql, function (err, result) {
                
                if (err) {
                    console.log("Fazendo roolback - Problema na persistência da OS");
                    connection.rollback(function () {
                        throw err;
                    });
                } else {
                    var event = os.event;
                    console.log(result);
                    event.osId = result.insertId;
                    console.log("A OS foi registrada com o ID = " + event.osId);
                    sql = util.format('INSERT INTO evento (DATA_HORA, OS_ID, TIPO_EVENTO_ID, DESCRICAO, TECNICO_ID) VALUES (NOW(), %s, \'%s\',\'%s\', %s)', event.osId, event.tipoEventID, event.description, event.technicalId)
                    connection.query(sql, function (err, result) {
                        if (err) {
                            console.log("Fazendo roolback - Problema na persistência do Evento");
                            connection.rollback(function () {
                                throw err;
                            });
                        }
                        console.log("O Evento foi registrado com o ID = " + result.insertId);
                        connection.commit(function (err, rows, fields) {
                            if (err) { 
                                connection.rollback(function () {
                                    console.log("Ocorreu um erro no commit da transação ");
                                    throw err;
                                });
                            }
                            console.log('Transação completa.');                                                     
                            callback(err, event.osId, fields);
                        });                        
                    });     
                }
            });
        }); 
        },
        
       
        
        //
        // Associate Technical
        //
    associateTechnical: function associateTechnical(os, callback) {        
        
        connection.beginTransaction(function (err) {
            console.log("iniciou transação");
            if (err) { 
                console.log("Erro. Não foi possível iniciar transação..");
                throw err; 
            }                       
            console.log(os);
            console.log(os.technicalId);
            console.log(os.osId);
            var sql = util.format('UPDATE OS SET TECNICO_ID = %s WHERE ID = %s', os.technicalId, os.osId);
            connection.query(sql, function (err, result) {
                
                if (err) {
                    console.log("Fazendo roolback - Problema na atualização da OS");
                    connection.rollback(function () {
                        throw err;
                    });
                } else {
                    var event = os.event;
                    console.log(result);
                    event.osId = os.osId;
                    console.log("A OS com o ID = " + event.osId + " foi atualizada");
                    sql = util.format('INSERT INTO evento (DATA_HORA, OS_ID, TIPO_EVENTO_ID, DESCRICAO, TECNICO_ID) VALUES (NOW(), %s, \'%s\',\'%s\', %s)', event.osId, event.tipoEventID, event.description, event.technicalId);
                    connection.query(sql, function (err, result) {
                        if (err) {
                            console.log("Fazendo roolback - Problema na persistência do Evento");
                            connection.rollback(function () {
                                throw err;
                            });
                        }
                        console.log("O Evento foi registrado com o ID = ");//+  result.insertId );
                        connection.commit(function (err, rows, fields) {
                            if (err) { 
                                connection.rollback(function () {
                                    console.log("Ocorreu um erro no commit da transação ");
                                    throw err;
                                });
                            }
                            console.log('Transação completa.');                                                     
                            callback(err, rows, fields);
                        });                        
                    });     
                }
            });
        });   
    },
        
    //
    // Finished OS
    //
    changeSituationOS: function changeSituationOS(object, callback) {  
       
        connection.beginTransaction(function (err) {
                console.log("iniciou transação");
                if (err) { 
                    console.log("Erro. Não foi possível iniciar transação..");
                    throw err; 
                }                       
                var sql = util.format('UPDATE OS SET SITUACAO_ID = %s WHERE id = %s', object.situationId, object.osId);
            connection.query(sql, function (err, result) {
                    
                if (err) {
                        console.log("Fazendo roolback - Problema na atualização da OS");
                    connection.rollback(function () {
                            throw err;
                        });
                } else {
                        var event = object.event;
                        console.log(result);
                        event.osId = object.osId;
                    console.log("A OS com o ID = " + event.osId + " foi atualizada");
                        sql = util.format('INSERT INTO evento (DATA_HORA, OS_ID, TIPO_EVENTO_ID, DESCRICAO, TECNICO_ID) VALUES (NOW(), %s, \'%s\',\'%s\', %s)', event.osId, event.tipoEventID, event.description, event.technicalId);
                    connection.query(sql, function (err, result) {
                        if (err) {
                                console.log("Fazendo roolback - Problema na persistência do Evento");
                            connection.rollback(function () {
                                    throw err;
                                });
                            }
                        console.log("O Evento foi registrado com o ID = " + object.osId);
                        connection.commit(function (err, rows, fields) {
                                if (err) { 
                                connection.rollback(function () {
                                        console.log("Ocorreu um erro no commit da transação ");
                                        throw err;
                                    });
                                }
                                console.log('Transação completa.');    
                                callback(err, event.osId, fields);
                            });
                        });     
                    }
                });
            });   
        },
        listClients: function listClients(callback) {
            var sql = util.format('SELECT * FROM CLIENTE');
            this.runQuery(sql, callback.bind(this));
        },                 
     
    };
    
    
    