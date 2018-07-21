const util = require("util");
const mysql = require("mysql");
const utilHelpnet = require("./util/util");
require("dotenv").load();

// LOCALHOST
// BD_HOST=localhost
// BD_USER=root
// BD_PASSWORD=root
// BD_DATABASE=helpnet

const connection = mysql.createConnection({
  host: process.env.BD_HOST,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_DATABASE
});

function syncronizedCustomer(
  customerFromProvider,
  idCustomerFromHelpnet,
  idProvider,
  callback
) {
  let sql;
  if (
    typeof idCustomerFromHelpnet == "undefined" ||
    idCustomerFromHelpnet == null
  ) {
    sql = util.format(
      "INSERT INTO cliente (" +
        "nome, cpf_cnpj, nome_res, fone, celular, login, email, endereco, numero, bairro, cidade, estado, cep, bloqueado, cli_ativado, " +
        "USUARIO_ID, PROVIDER_ID, data_inclusao, cadastro) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s','%s','%s','%s','%s','%s','%s','%s','%s', 1, %s, NOW(), '%s')",
      customerFromProvider.nome,
      customerFromProvider.cpf_cnpj,
      customerFromProvider.nome_res,
      customerFromProvider.fone,
      customerFromProvider.celular,
      customerFromProvider.login,
      customerFromProvider.email,
      customerFromProvider.endereco,
      customerFromProvider.numero,
      customerFromProvider.bairro,
      customerFromProvider.cidade,
      customerFromProvider.estado,
      customerFromProvider.cep,
      customerFromProvider.bloqueado,
      customerFromProvider.cli_ativado,
      idProvider,
      customerFromProvider.cadastro
    );
  } else {
    sql = util.format(
      "UPDATE cliente SET " +
        "nome ='%s', " +
        "cpf_cnpj ='%s', " +
        "nome_res ='%s', " +
        "fone = '%s', " +
        "celular ='%s', " +
        "login ='%s', " +
        "email = '%s', " +
        "endereco ='%s', " +
        "numero ='%s', " +
        "bairro ='%s', " +
        "cidade ='%s', " +
        "estado ='%s', " +
        "cep ='%s', " +
        "bloqueado ='%s', " +
        "cli_ativado ='%s', " +
        "data_atualizacao =  NOW(), " +
        "cadastro = '%s' " +
        "WHERE ID = %d",
      customerFromProvider.nome,
      customerFromProvider.cpf_cnpj,
      customerFromProvider.nome_res,
      customerFromProvider.fone,
      customerFromProvider.celular,
      customerFromProvider.login,
      customerFromProvider.email,
      customerFromProvider.endereco,
      customerFromProvider.numero,
      customerFromProvider.bairro,
      customerFromProvider.cidade,
      customerFromProvider.estado,
      customerFromProvider.cep,
      customerFromProvider.bloqueado,
      customerFromProvider.cli_ativado,
      customerFromProvider.cadastro,
      idCustomerFromHelpnet
    );
  }
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("Problema na atualização dos dados do cliente");
      console.log(err);
    } else {
      console.log("Os dados do cliente foram atualizados com sucesso");
    }
    if (typeof result !== "undefined" && result.insertId !== "undefined") {
      callback(err, result.insertId);
    } else {
      callback(err, result);
    }
  });
}

function matchCustomer(customerOne, customerTwo) {
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
  if (customerOne.cidade === null) customerOne.cidade = "null";
  if (customerOne.estado === null) customerOne.estado = "null";
  if (customerOne.cep === null) customerOne.cep = "null";
  if (customerOne.bloqueado === null) customerOne.bloqueado = "null";
  if (customerOne.cli_ativado === null) customerOne.cli_ativado = "null";
  if (customerOne.cadastro === null) customerOne.cadastro = "null";

  if (
    customerOne.nome == customerTwo.nome &&
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
    customerOne.cli_ativado == customerTwo.cli_ativado &&
    customerOne.cadastro == customerTwo.cadastro
  ) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  //
  // Executa Query quando não houver transação
  //
  runQuery: function runQuery(sql, callback) {
    connection.query(sql, function(err, rows, fields) {
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
    const sql = util.format("SELECT * FROM situacao_os");
    this.runQuery(sql, callback.bind(this));
  },

  //
  // Localiza o cliente na base do Helpnet
  //
  getLocalCustomer: function getLocalCustomer(cpfCustomer, callback) {
    const sql = util.format(
      "SELECT * FROM cliente WHERE cpf_cnpj = '%s'",
      cpfCustomer
    );
    connection.query(sql, function(err, result) {
      if (err) {
        console.log("Ocorreu um erro na consulta ao cliente");
        console.log(err);
        callback(err, result);
      }
      callback(err, result);
    });
  },

  //
  // Recuper as informações atulizadas do cliente e do Provedor que o cliente está cadastrado
  //
  getCustomer: function getCustomer(cpfCustomer, callback) {
    this.getLocalCustomer(cpfCustomer, function(err, rows, fields) {
      let customer = new Object();
      if (typeof rows[0] !== "undefined") {
        console.log("O cliente foi localizado na base do Helpnet");
        customer = rows[0];
      } else {
        console.log(
          "O cliente não foi localizado na base do Helpnet, será feita uma busca por todos os provedores"
        );
        customer.cpf_cnpj = cpfCustomer;
      }

      let sql;
      if (typeof customer.PROVIDER_ID !== "undefined") {
        sql = util.format(
          "SELECT * FROM provedor WHERE ID = %d",
          customer.PROVIDER_ID
        );
      } else {
        sql = util.format("SELECT * FROM provedor");
      }
      connection.query(sql, function(err, result) {
        if (err) {
          console.log("Ocorreu um erro na consulta do provedor");
        } else {
          if (typeof result !== undefined) {
            let totalInteration = result.length;
            let interation = 0;
            let providers = result;

            // Consulta a base do primeiro provedor para buscar as informações do cliente, quando não encontra,
            // entra em loop buscando nos outros provedores, até encontrar ou percorrer todos os provedores
            getProviderCustomer(
              interation,
              totalInteration,
              providers,
              customer,
              function(err, rows) {
                let customerFromProvider = rows.customer;
                let idCustomerFromHelpnet = customer.id;
                let returnFull = rows;
                if (err) {
                  // Quando ocorre problema na consulta dos provedores, será retornado o cliente da base do Helpnet
                  console.log("Não foi possível consultar no provedor");

                  let finalResult;
                  if (typeof customer.id == "undefined") {
                    callback(err, "404");
                  } else {
                    finalResult = buildResultFull(
                      providers[interation],
                      customer
                    );
                  }
                  callback(false, finalResult);
                } else {
                  if (
                    typeof returnFull !== "undefined" &&
                    typeof customerFromProvider !== "undefined" &&
                    typeof customer !== "undefined"
                  ) {
                    if (!matchCustomer(customerFromProvider, customer)) {
                      console.log(
                        "Foi identificado divergencias nos dados do cliente"
                      );

                      syncronizedCustomer(
                        customerFromProvider,
                        idCustomerFromHelpnet,
                        returnFull.provider.ID,
                        function(err, result) {
                          if (typeof result !== "undefined" && result !== 0) {
                            returnFull.customer.id = result;
                          } else {
                            returnFull.customer.id = idCustomerFromHelpnet;
                          }
                          callback(err, returnFull);
                        }
                      );
                    } else {
                      console.log(
                        "O cliente já está sincronizado com a base do Helpnet"
                      );
                      returnFull.customer.id = idCustomerFromHelpnet;
                      callback(err, returnFull);
                    }
                  } else {
                    console.log("Não encontrou em lugar nenhum");
                    callback(err, "404");
                  }
                }
              }
            );
          } else {
            callback(err, "No provider found");
          }
        }
      });

      function buildResultFull(provider, customer) {
        let finalResult = new Object();
        finalResult.provider = getProviderData(provider);
        finalResult.customer = customer;
        return finalResult;
      }

      function getProviderData(provider) {
        let providerResult = new Object();
        providerResult.ID = provider.ID;
        providerResult.NOME = provider.NOME;
        providerResult.DESCRICAO = provider.DESCRICAO;
        providerResult.SITUACAO = provider.SITUACAO;
        providerResult.EMAIL = provider.EMAIL;
        providerResult.TELEFONE_CONTATO = provider.TELEFONE_CONTATO;
        providerResult.CELULAR_CONTATO = provider.CELULAR_CONTATO;

        return providerResult;
      }

      //Consulta do cliente na base do Provedor
      function getProviderCustomer(
        interation,
        totalInteration,
        providers,
        customerParam,
        callback
      ) {
        let provider = providers[interation];
        let cpfCustomer = customerParam.cpf_cnpj;

        let table = provider.BD_TABLE;
        let columnIdentify = provider.BD_COLUMN_IDENTIFY;
        let select = provider.BD_SELECT;
        let connectionProvider = mysql.createConnection({
          host: provider.BD_URL,
          user: provider.BD_USUARIO,
          password: provider.BD_SENHA,
          database: provider.BD_NOME
        });

        let sqlProvider = util.format(
          "%s FROM %s WHERE %s = '%s'",
          select,
          table,
          columnIdentify,
          cpfCustomer
        );
        console.log(sqlProvider);
        connectionProvider.query(sqlProvider, function(err, result) {
          if (err) {
            console.log("Ocorreu um erro na consulta a base do provedor");
            console.log(err);
            //callback(err, rows);
          }

          let customer = undefined;
          if (typeof result !== "undefined" && result[0] !== "undefined") {
            customer = result[0];
          }
          if (typeof customer !== "undefined") {
            let finalResult = buildResultFull(provider, customer);
            callback(err, finalResult);
          } else {
            interation++;
            if (totalInteration > interation) {
              getProviderCustomer(
                interation,
                totalInteration,
                providers,
                customerParam,
                function(err, rows) {
                  callback(err, rows);
                }
              );
            } else {
              if (typeof customerParam.ID == "undefined") {
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

  loadBaseCustomerFromProvider: function loadBaseCustomerFromProvider(
    providerID,
    callback
  ) {
    const sql = util.format("SELECT * FROM provedor WHERE ID = %d", providerID);
    connection.query(sql, function(err, result) {
      if (err) {
        console.log("Ocorreu um erro na consulta do provedor");
        console.log(err);
      } else {
        let provider = result[0];
        let table = provider.BD_TABLE;
        let select = provider.BD_SELECT;
        let connectionProvider = mysql.createConnection({
          host: provider.BD_URL,
          user: provider.BD_USUARIO,
          password: provider.BD_SENHA,
          database: provider.BD_NOME
        });

        let sqlProvider = util.format("%s FROM %s", select, table);
        connectionProvider.query(sqlProvider, function(err, result) {
          if (err) {
            console.log("Ocorreu um erro na consulta a base do provedor");
            console.log(err);
          } else {
            let totalInteration = result.length;
            let interation = 0;
            let customers = result;

            existCustomer(
              customers,
              interation,
              totalInteration,
              provider,
              function(err, result) {
                callback(err, result);
              }
            );
          }
        });
      }
    });

    function existCustomer(
      customers,
      interation,
      totalInteration,
      provider,
      callback
    ) {
      let customerId;
      let customer = customers[interation];
      let sql = util.format(
        "SELECT * FROM cliente WHERE cpf_cnpj = %s",
        customer.cpf_cnpj
      );
      connection.query(sql, function(err, result) {
        if (err) {
          console.log("Problema na consulta do cliente na base do HelpNet");
          console.log(err);
        }
        if (typeof result[0] !== "undefined") {
          customerId = result[0].id;
        }
        syncronizedCustomer(customer, customerId, provider.ID, function(
          err,
          result
        ) {
          if (err) {
            console.log(err);
          } else {
            console.log(JSON.stringify(result));
          }
        });

        interation++;
        if (totalInteration > interation) {
          existCustomer(
            customers,
            interation,
            totalInteration,
            provider,
            function(err, result) {
              if (err) {
                console.log(
                  "Problema na consulta do cliente na base do HelpNet"
                );
                console.log(err);
              }
              callback(err, result);
            }
          );
        } else {
          callback(err, "Todos os clientes sincronizados");
        }
      });
    }
  },

  //
  // Listar todas os problemas conhecidos que podem motilet uma abertura de OS
  //
  listProblems: function listProblems(callback) {
    let sql = util.format("SELECT * FROM problema_os");
    this.runQuery(sql, callback.bind(this));
  },

  //
  // Listar todas as OS de um determinado provedor
  //
  listOS: function listOS(providerId, callback) {
    let sql = util.format(
      "SELECT * FROM os WHERE PROVEDOR_ID = %d",
      providerId
    );
    this.runQuery(sql, callback.bind(this));
  },

  //
  // Listar as OS de um determinado provedor, filtrnado pela situação
  //
  listOSBySituation: function listOSBySituation(
    providerId,
    situationId,
    callback
  ) {
    let sql = util.format(
      "SELECT * FROM os WHERE PROVEDOR_ID = %d AND SITUACAO_ID = %d",
      providerId,
      situationId
    );
    this.runQuery(sql, callback.bind(this));
  },

  listOSByCustomer: function listOSByCustomer(
    providerId,
    customerId,
    callback
  ) {
    let sql = util.format(
      "SELECT * FROM os WHERE PROVEDOR_ID = %d AND CLIENTE_ID = %d",
      providerId,
      customerId
    );
    this.runQuery(sql, callback.bind(this));
  },

  //
  // Registra uma nova OS
  //
  registerOS: function registerOS(os, callback) {
    connection.beginTransaction(function(err) {
      console.log("iniciou transação");
      if (err) {
        console.log("Erro. Não foi possível iniciar transação..");
        throw err;
      }
      let increment =
        "concat('" +
        os.number +
        "',(SELECT Auto_increment FROM information_schema.tables WHERE table_name='os') + 1)";
      let sql = util.format(
        "INSERT INTO os (NUMERO, DATA_ABERTURA, CLIENTE_ID, PROBLEMA_ID, DETALHES, SITUACAO_ID, PROVEDOR_ID) VALUES (" +
          increment +
          ", NOW(), %s, %s, '%s', 1, %s)",
        os.clienteId,
        os.problemId,
        os.details,
        os.providerId
      );
      connection.query(sql, function(err, result) {
        if (err) {
          console.log("Fazendo roolback - Problema na persistência da OS");
          connection.rollback(function() {
            throw err;
          });
        } else {
          let event = new Object();
          os.id = result.insertId;
          event.osId = result.insertId;
          event.tipoEventID = 1;
          console.log("A OS foi registrada com o ID = " + event.osId);
          sql = util.format(
            "INSERT INTO evento (DATA_HORA, OS_ID, TIPO_EVENTO_ID) VALUES (NOW(), %s, %s)",
            event.osId,
            event.tipoEventID
          );
          connection.query(sql, function(err, result) {
            if (err) {
              console.log(
                "Fazendo roolback - Problema na persistência do Evento"
              );
              connection.rollback(function() {
                throw err;
              });
            }
            console.log(
              "O Evento foi registrado com o ID = " + result.insertId
            );
            connection.commit(function(err, rows, fields) {
              if (err) {
                connection.rollback(function() {
                  console.log("Ocorreu um erro no commit da transação ");
                  throw err;
                });
              }
              console.log("Transação completa.");
              /*
                              // Este passo é temporário, apenas enquando o APP do técnico não estiver funcional
                              */
              sql = util.format(
                "SELECT cli.nome, cli.cpf_cnpj, cli.nome_res, cli.fone, cli.celular, cli.endereco, cli.numero, cli.bairro, cli.cidade, cli.estado, cli.cep, cli.cadastro, prob.titulo, os.numero as numeroOS, os.detalhes FROM cliente as cli join problema_os as prob join os as os where cli.id = %s and prob.id = %s and os.ID = %s",
                os.clienteId,
                os.problemId,
                os.id
              );
              connection.query(sql, function(err, result) {
                os.number = result[0].numeroOS;
                if (err) {
                  console.log(
                    "Ocorreu um erro ao tentar obter as informações da OS"
                  );
                  console.log(err);
                } else {
                  let osDescription = new Object();
                  osDescription.numeroOS = result[0].numeroOS;
                  osDescription.detalhesOS = result[0].detalhes;
                  osDescription.nomeCliente = result[0].nome;
                  osDescription.problema = result[0].titulo;
                  osDescription.cpf_cnpj = result[0].cpf_cnpj;
                  osDescription.nome_res = result[0].nome_res;
                  osDescription.fone = result[0].fone;
                  osDescription.celular = result[0].celular;
                  osDescription.endereco = result[0].endereco;
                  osDescription.numero = result[0].numero;
                  osDescription.bairro = result[0].bairro;
                  osDescription.cidade = result[0].cidade;
                  osDescription.estado = result[0].estado;
                  osDescription.cep = result[0].cep;
                  osDescription.dataCadastroProvedor = result[0].cadastro;

                  
                  const osHtml = utilHelpnet.builderContentMailNewOS(
                    osDescription
                  );

                  utilHelpnet.sendMail("Abertura da OS: " + os.number, osHtml);
                }
                callback(err, os.number, fields);
              });

              // Aqui finaliza o bloco temporário
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
    connection.beginTransaction(function(err) {
      console.log("iniciou transação");
      if (err) {
        console.log("Erro. Não foi possível iniciar transação..");
        throw err;
      }
      let sql = util.format(
        "UPDATE os SET TECNICO_ID = %s WHERE ID = %s",
        os.technicalId,
        os.osId
      );
      connection.query(sql, function(err, result) {
        if (err) {
          console.log("Fazendo roolback - Problema na atualização da OS");
          connection.rollback(function() {
            throw err;
          });
        } else {
          let event = os.event;
          console.log(result);
          event.osId = os.osId;
          console.log("A OS com o ID = " + event.osId + " foi atualizada");
          sql = util.format(
            "INSERT INTO evento (DATA_HORA, OS_ID, TIPO_EVENTO_ID, DESCRICAO, TECNICO_ID) VALUES (NOW(), %s, '%s','%s', %s)",
            event.osId,
            event.tipoEventID,
            event.description,
            event.technicalId
          );
          connection.query(sql, function(err, result) {
            if (err) {
              console.log(
                "Fazendo roolback - Problema na persistência do Evento"
              );
              connection.rollback(function() {
                throw err;
              });
            }
            console.log("O Evento foi registrado com o ID = "); //+  result.insertId );
            connection.commit(function(err, rows, fields) {
              if (err) {
                connection.rollback(function() {
                  console.log("Ocorreu um erro no commit da transação ");
                  throw err;
                });
              }
              console.log("Transação completa.");
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
    connection.beginTransaction(function(err) {
      console.log("iniciou transação");
      if (err) {
        console.log("Erro. Não foi possível iniciar transação..");
        throw err;
      }
      let sql = util.format(
        "UPDATE os SET SITUACAO_ID = %s WHERE id = %s",
        object.situationId,
        object.osId
      );
      connection.query(sql, function(err, result) {
        if (err) {
          console.log("Fazendo roolback - Problema na atualização da OS");
          connection.rollback(function() {
            throw err;
          });
        } else {
          let event = object.event;
          console.log(result);
          event.osId = object.osId;
          console.log("A OS com o ID = " + event.osId + " foi atualizada");
          sql = util.format(
            "INSERT INTO evento (DATA_HORA, OS_ID, TIPO_EVENTO_ID, DESCRICAO, TECNICO_ID) VALUES (NOW(), %s, '%s','%s', %s)",
            event.osId,
            event.tipoEventID,
            event.description,
            event.technicalId
          );
          connection.query(sql, function(err, result) {
            if (err) {
              console.log(
                "Fazendo roolback - Problema na persistência do Evento"
              );
              connection.rollback(function() {
                throw err;
              });
            }
            console.log("O Evento foi registrado com o ID = " + object.osId);
            connection.commit(function(err, rows, fields) {
              if (err) {
                connection.rollback(function() {
                  console.log("Ocorreu um erro no commit da transação ");
                  throw err;
                });
              }
              console.log("Transação completa.");
              callback(err, event.osId, fields);
            });
          });
        }
      });
    });
  },
  listClients: function listClients(callback) {
    const sql = util.format("SELECT * FROM cliente");
    this.runQuery(sql, callback.bind(this));
  }
};
