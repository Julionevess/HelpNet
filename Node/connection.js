var util = require('util');
var mysql = require('mysql');

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
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'helpnet'
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

    //
    // Localiza o cliente na base do Helpnet 
    //
    getLocalCustomer: function getLocalCustomer(cpfCustomer, callback) {
        var sql = util.format('SELECT * FROM cliente WHERE CPF = %s', cpfCustomer);
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("Ocorreu um erro na consulta ao cliente");
                console.log(err);
            }
            callback(err, result);
        });
    },

    //
    // Recuper as informações atulizadas do cliente e do Provedor que o cliente está cadastrado
    //
    getCustomer: function getCustomer(cpfCustomer, callback) {

        this.getLocalCustomer(cpfCustomer, function (err, rows, fields) {

            var customer = new Object();
            if (typeof rows[0] !== 'undefined') {
                console.log("O cliente foi localizado na base do Helpnet");
                var customer = rows[0];
            } else {
                console.log("O cliente não foi localizado na base do Helpnet, será feita uma busca por todos os provedores");
                customer.CPF = cpfCustomer;
            }

            if (typeof customer.PROVIDER_ID !== 'undefined') {
                var sql = util.format('SELECT * FROM provedor WHERE ID = %d', customer.PROVIDER_ID);
            } else {
                var sql = util.format('SELECT * FROM provedor');
            }
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log("Ocorreu um erro na consulta do provedor");
                } else {

                    if (typeof result !== undefined) {

                        var totalInteration = result.length;
                        var interation = 0;
                        var providers = result;
                        /*
                        //Consulta a base do primeiro provedor para buscar as informações do cliente, quando não encontra,
                        // entra em loop buscando nos outros provedores, até encontrar ou percorrer todos os provedores
                        */
                        getProviderCustomer(interation, totalInteration, providers, customer, function (err, rows, fields) {
                            if (err) {
                                // Quando ocorre problema na consulta dos provedores, será retornado o cliente da base do Helpnet                                 
                            } else {
                                if (rows.customer !== customer) {
                                    // Aqui deve entrar uma chamada de atualização da tabela do Helpnet 

                                    console.log("Foi identificado divergencias nos dados dos cliente");
                                }

                            }
                            interation++;
                            if (totalInteration > interation) {
                                getProviderCustomer(interation, totalInteration, providers, customer, function (err, rows, fields) {
                                    callback(err, rows);
                                });
                            } else {
                                if (typeof customer.ID == 'undefined') {
                                    callback(err, "Customer not found");
                                } else {
                                    callback(err, rows);
                                }
                            }
                        });
                    } else {
                        callback(err, "No provider found");
                    }
                }
            });

            /*
            //Consulta do cliente na base do Provedor
            */
            getProviderCustomer: function getProviderCustomer(interation, totalInteration, providers, customerParam, callback) {

                var provider = providers[interation];
                var cpfCustomer = customerParam.CPF;

                var table = provider.BD_TABLE
                var columnIdentify = provider.BD_COLUMN_IDENTIFY
                var select = provider.BD_SELECT
                var connectionProvider = mysql.createConnection({
                    host: provider.BD_URL,
                    user: provider.BD_USUARIO,
                    password: provider.BD_SENHA,
                    database: provider.BD_NOME
                });

                var sqlProvider = util.format('%s FROM %s WHERE %s =%s', select, table, columnIdentify, cpfCustomer);
                console.log(sqlProvider);
                connectionProvider.query(sqlProvider, function (err, result) {

                    if (err) {
                        console.log("Ocorreu um erro na consulta a base do provedor");
                        console.log(err);
                        callback(err, rows);
                    } else {
                        var customer = result[0];
                        if (typeof customer !== 'undefined') {
                            var finalResult = new Object();
                            finalResult.provider = provider;
                            finalResult.customer = customer;
                            callback(err, finalResult);
                        }
                    }
                });
            }
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
                    var event = new Object();
                    console.log(result);
                    event.osId = result.insertId;
                    event.tipoEventID = 1
                    console.log("A OS foi registrada com o ID = " + event.osId);
                    sql = util.format('INSERT INTO evento (DATA_HORA, OS_ID, TIPO_EVENTO_ID) VALUES (NOW(), %s, %s)', event.osId, event.tipoEventID)
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
                            callback(err, os.number, fields);
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


