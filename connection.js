var util = require('util');
var mysql = require('mysql');
var utilHelpnet = require('/util/util');

//HEROKU
var connection = mysql.createConnection({
    host: 'lt80glfe2gj8p5n2.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user: 'wnxoormb91xkfef9',
    password: 'qmwan6b8lamtbp9j',
    database: 's0xdx9gvx8au1ooc'
});

function syncronizedCustomer(customer, idCustomer, idProvider) {
    var sql;
    if (typeof idCustomer == 'undefined' || idCustomer == null) {
        sql = util.format("INSERT INTO CLIENTE (" +
            "nome, cpf_cnpj, nome_res, fone, celular, login, email, endereco, numero, bairro, cidade, estado, cep, bloqueado, cli_ativado, " +
            "USUARIO_ID, PROVIDER_ID) VALUES (\'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\',\'%s\', 1, %s)",
            customer.nome,
            customer.cpf_cnpj,
            customer.nome_res,
            customer.fone,
            customer.celular,
            customer.login,
            customer.email,
            customer.endereco,
            customer.numero,
            customer.bairro,
            customer.cidade,
            customer.estado,
            customer.cep,
            customer.bloqueado,
            customer.cli_ativado,
            idProvider);
    } else {
        sql = util.format("UPDATE CLIENTE SET " +
            "nome =\"%s\", " +
            "cpf_cnpj =\"%s\", " +
            "nome_res =\"%s\", " +
            "fone =\"%s\", " +
            "celular =\"%s\", " +
            "login =\"%s\", " +
            "email =\"%s\", " +
            "endereco =\"%s\", " +
            "numero =\"%s\", " +
            "bairro =\"%s\", " +
            "cidade =\"%s\", " +
            "estado =\"%s\", " +
            "cep =\"%s\", " +
            "bloqueado =\"%s\", " +
            "cli_ativado =\"%s\" " +
            "WHERE ID = %d",
            customer.nome,
            customer.cpf_cnpj,
            customer.nome_res,
            customer.fone,
            customer.celular,
            customer.login,
            customer.email,
            customer.endereco,
            customer.numero,
            customer.bairro,
            customer.cidade,
            customer.estado,
            customer.cep,
            customer.bloqueado,
            customer.cli_ativado,
            idCustomer);
    }
    connection.query(sql, function (err, result, callback) {
        if (err) {
            console.log("Problema na atualização dos dados do cliente");
            console.log(err);
        } else {
            console.log("Os dados do cliente foi atualizado com sucesso");
        }
    });
};

function matchCustomer(customerOne, customerTwo, callback) {

    if (customerOne.nome == null) customerOne.nome = "null";
    if (customerOne.cpf_cnpj === null) customerOne.cpf_cnpj = "null";
    if (customerOne.nome_res === null) customerOne.nome_res = "null";
    if (customerOne.fone === null) customerOne.fone = "null";
    if (customerOne.celular === null) customerOne.celular = "null";
    if (customerOne.login === null) customerOne.login = "null";
    if (customerOne.email === null) customerOne.email = "null";
    if (customerOne.endereco === null) customerOne.endereco = "null";
    if (customerOne.numero === null) customerOne.numero = "null";
    if (customerOne.bairro === null) customerOne.bairro = "null";
    if (customerOne.cidade === null) customerOne.ciadade = "null";
    if (customerOne.estado === null) customerOne.estado = "null";
    if (customerOne.cep === null) customerOne.cep = "null";
    if (customerOne.bloqueado === null) customerOne.bloqueado = "null";
    if (customerOne.cli_ativado === null) customerOne.cli_ativado = "null";

    if (customerOne.nome == customerTwo.nome &&
        customerOne.cpf_cnpj == customerTwo.cpf_cnpj &&
        customerOne.nome_res == customerTwo.nome_res &&
        customerOne.fone == customerTwo.fone &&
        customerOne.celular == customerTwo.celular &&
        customerOne.login == customerTwo.login &&
        customerOne.email == customerTwo.email &&
        customerOne.endereco == customerTwo.endereco &&
        customerOne.numero == customerTwo.numero &&
        customerOne.bairro == customerTwo.bairro &&
        customerOne.cidade == customerTwo.cidade &&
        customerOne.estado == customerTwo.estado &&
        customerOne.cep == customerTwo.cep &&
        customerOne.bloqueado == customerTwo.bloqueado &&
        customerOne.cli_ativado == customerTwo.cli_ativado
    ) {
        return true;
    } else {
        return false;
    }
};

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
        var sql = util.format('SELECT * FROM cliente WHERE cpf_cnpj = %s', cpfCustomer);
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
                customer.cpf_cnpj = cpfCustomer;
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
                            callback(err, rows);
                            if (err) {
                                // Quando ocorre problema na consulta dos provedores, será retornado o cliente da base do Helpnet                                 
                            } else {
                                if (typeof rows !== 'undefined' && typeof rows.customer !== 'undefined' && typeof customer !== 'undefined') {
                                    if (!matchCustomer(rows.customer, customer)) {
                                        // Aqui deve entrar uma chamada de atualização da tabela do Helpnet 

                                        console.log("Foi identificado divergencias nos dados dos cliente");

                                        syncronizedCustomer(rows.customer, customer.id, rows.provider.ID);
                                    }
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
            function getProviderCustomer(interation, totalInteration, providers, customerParam, callback) {

                var provider = providers[interation];
                var cpfCustomer = customerParam.cpf_cnpj;

                var table = provider.BD_TABLE
                var columnIdentify = provider.BD_COLUMN_IDENTIFY
                var select = provider.BD_SELECT
                var connectionProvider = mysql.createConnection({
                    host: provider.BD_URL,
                    user: provider.BD_USUARIO,
                    password: provider.BD_SENHA,
                    database: provider.BD_NOME
                });

                var sqlProvider = util.format('%s FROM %s WHERE %s = %s', select, table, columnIdentify, cpfCustomer);
                console.log(sqlProvider);
                connectionProvider.query(sqlProvider, function (err, result) {

                    if (err) {
                        console.log("Ocorreu um erro na consulta a base do provedor");
                        console.log(err);
                        //callback(err, rows);
                    }

                    if (typeof result !== 'undefined' && result[0] !== 'undefined') {
                        var customer = result[0];
                    }
                    if (typeof customer !== 'undefined') {
                        var finalResult = new Object();
                        finalResult.provider = provider;
                        finalResult.customer = customer;
                        callback(err, finalResult);
                    } else {
                        interation++;
                        if (totalInteration > interation) {
                            getProviderCustomer(interation, totalInteration, providers, customerParam, function (err, rows) {
                                callback(err, rows);
                            });
                        } else {
                            if (typeof customerParam.ID == 'undefined') {
                                callback(err, "Customer not found");
                            } else {
                                callback(err, rows);
                            }
                        }
                    }


                });
            }
        });
    },


    loadBaseCustomerFromProvider: function loadBaseCustomerFromProvider(providerID, callback) {

        var sql = util.format('SELECT * FROM provedor WHERE ID = %d', providerID);
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("Ocorreu um erro na consulta do provedor");
                console.log(err);
            } else {

                var provider = result[0];
                var table = provider.BD_TABLE
                var select = provider.BD_SELECT
                var connectionProvider = mysql.createConnection({
                    host: provider.BD_URL,
                    user: provider.BD_USUARIO,
                    password: provider.BD_SENHA,
                    database: provider.BD_NOME
                });

                var sqlProvider = util.format('%s FROM %s', select, table);
                connectionProvider.query(sqlProvider, function (err, result) {

                    if (err) {
                        console.log("Ocorreu um erro na consulta a base do provedor");
                        console.log(err);
                    } else {

                        var totalInteration = result.length;
                        var interation = 0;
                        var customers = result;

                        existCustomer(customers, interation, totalInteration, provider, function (err, result) {
                            callback(err, result);
                        });

                    }

                });
            }
        });

        function existCustomer(customers, interation, totalInteration, provider, callback) {
            var customerId;
            var customer = customers[interation];
            var sql = util.format('SELECT * FROM cliente WHERE cpf_cnpj = %s', customer.cpf_cnpj);
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log("Problema na consulta do cliente na base do HelpNet");
                    console.log(err);
                }
                if (typeof result[interation] !== 'undefined') {
                    customerId = result[interation].id
                }
                syncronizedCustomer(customer, customerId, provider.ID);


                interation++;
                if (totalInteration > interation) {
                    existCustomer(customers, interation, totalInteration, provider, function (err, result) {
                        if (err) {
                            console.log("Problema na consulta do cliente na base do HelpNet");
                            console.log(err);
                        }
                        callback(err, result);
                    });
                } else {
                    callback(err, "Todos os clientes sincronizados");
                }



            });
        }

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
                    os.id = result.insertId;
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
                            /*
                            // Este passo é temporário, apenas enquando o APP do técnico não estiver funcional
                            */
                            sql = util.format('select cli.nome, prob.titulo from cliente as cli, problema_os as prob where cli.id = %s and prob.id = %s', os.clienteId, os.problemId)
                            connection.query(sql, function (err, result) {
                                if (err) {
                                    console.log("Ocorreu um erro ao tentar obter as informações da OS");
                                    console.log(err);
                                } else {
                                    var osDescription = new Object();
                                    osDescription.numero = os.number;
                                    osDescription.detalhesOS = os.details;
                                    osDescription.NomeCliente = result[0].nome;
                                    osDescription.problema = result[0].titulo;
                                    var osHtml = "<h1>Informações da OS aberta:</h1>" +
                                        "<table>" +
                                        "<tr>" +
                                        "<td>" +
                                        "Número: " +
                                        "</td>" +
                                        "<td>" +
                                        osDescription.numero +
                                        "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>" +
                                        "Detalhe da OS: " +
                                        "</td>" +
                                        "<td>" +
                                        osDescription.detalhesOS +
                                        "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>" +
                                        "Nome do Cliente: " +
                                        "</td>" +
                                        "<td>" +
                                        osDescription.NomeCliente +
                                        "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                        "<td>" +
                                        "Problema: " +
                                        "</td>" +
                                        "<td>" +
                                        osDescription.problema +
                                        "</td>" +
                                        "</tr>" +
                                        "</table>"

                                    utilHelpnet.sendMail("Abertura da OS:" + os.number, osHtml);
                                }
                            });

                            // Aqui finaliza o bloco temporário
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


