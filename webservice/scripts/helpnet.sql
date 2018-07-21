/*
SQLyog Community Edition- MySQL GUI v6.15
MySQL - 5.1.44-community : Database - helpnet
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `s0xdx9gvx8au1ooc`;

USE `s0xdx9gvx8au1ooc`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `cliente` */

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf_cnpj` varchar(14) NOT NULL,
  `USUARIO_ID` bigint(20) DEFAULT NULL,
  `PROVIDER_ID` bigint(20) NOT NULL,
  `nome_res` varchar(100) DEFAULT NULL,
  `fone` varchar(100) DEFAULT NULL,
  `celular` varchar(100) DEFAULT NULL,
  `login` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `numero` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `cep` varchar(100) DEFAULT NULL,
  `bloqueado` varchar(100) NOT NULL,
  `cli_ativado` varchar(100) NOT NULL,
  `data_inclusao` datetime DEFAULT NULL,
  `data_atualizacao` datetime DEFAULT NULL,
  `cadastro` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_USUARIO` (`USUARIO_ID`),
  CONSTRAINT `FK_USUARIO` FOREIGN KEY (`USUARIO_ID`) REFERENCES `usuario` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3402 DEFAULT CHARSET=latin1;

/*Data for the table `cliente` */

insert  into `cliente`(`id`,`nome`,`cpf_cnpj`,`USUARIO_ID`,`PROVIDER_ID`,`nome_res`,`fone`,`celular`,`login`,`email`,`endereco`,`numero`,`bairro`,`cidade`,`estado`,`cep`,`bloqueado`,`cli_ativado`,`data_inclusao`,`data_atualizacao`,`cadastro`) values (1,'Sebastina M de Carvalho','01234567890',1,1,'Cliente Teste',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nao','s','2018-07-16 13:58:00',NULL,NULL),(3003,'ALDO JERONIMO DA SILVA','64218120404',1,2,'ALDO','null','null','aldog@lagoanet.com.br','null','RUA ANTONIO FRANCISCO DA SILVA ','N 265','CENTRO','LAGOA DO CARRO','PE','55820-000','nao','s','2018-07-16 18:06:58','2018-07-21 17:03:03','21/08/2017'),(3004,'TACIANA SILVA DA ROCHA','07319839474',1,2,'TACIANA','null','(81)992920866','tassianas@lagoanet.com.br','null','PRACA DA SOLEDADE','null','CENTRO','LAGOA DO CARRO','PE','55820-000','nao','s','2018-07-16 18:07:15','2018-07-21 17:03:03','29/08/2017'),(3005,'LAGOAPREV','05018469000171',1,2,'LAGOAPREV','null','(81)995253691','lagoaprev@lagoanet.com.br','null','RUA BARÃO DE SÃO BORJA ','86','centro','LAGOA DO CARRO','PE','55820-000','sim','s','2018-07-16 18:07:21','2018-07-21 17:03:04','05/09/2017'),(3006,'JUCELINO ERNESTO DO REGO','88134717420',1,2,'JUCELINO','null','(81)993930070','jucelino@lagoanet.com.br','null','RUA ANTONIO GONÇALVES ','null','CENTRO','LAGOA DO CARRO','PE','55820-000','nao','s','2018-07-16 18:07:34','2018-07-21 17:03:05','28/02/2018'),(3007,'boss','55614450220',1,2,'boss','null','null','boss','null','null','null','null','null','PE','null','nao','s','2018-07-16 18:07:42',NULL,NULL),(3008,'EDUARDA MARIA DA SILVA','12576532454',1,2,'EDUARDA','null','(81)992519166','eduardam@lagoanet.com.br','null','RUA SAO JOSE ','182','CENTRO','LAGOA DO CARRO','PE','55820-000','nao','s','2018-07-21 16:02:30','2018-07-21 17:03:03','30/08/2017'),(3010,'MARIA JANIRA DO NASCIMENTO','02632482402',1,2,'MARIA','null','(81)991554218','janira@lagoanet.com.br','null','RUA PEDRO VICENTE DE LIMA','800','CENTRO','LAGOA DO CARRO','PE','55820-000','nao','s','2018-07-21 16:27:32','2018-07-21 17:03:03','03/11/2017'),(3011,'ABERLADO KENELINO ALVES LIMA','04171542405',1,2,'ABERLADO','null','(81)994381188','abelardok@lagoanet.com.br','null','LOT. LUIZ ANTONIO MARTINS','RODOVIA PE 90','CENTRO','LAGOA DO CARRO','PE','55820-000','sim','n','2018-07-21 17:03:03',NULL,'10/08/2017'),(3012,'ADAMILTON CORREIA DE OLIVEIRA','07133593408',1,2,'ADAILTON','null','(81)992752600','adamilton@lagoanet.com.br','null','RUA CORONEL ANTONIO TAVARES','null','MUTIRAO','LAGOA DO CARRO','PE','55820-000','nao','s','2018-07-21 17:03:03',NULL,'05/12/2017');

/*Table structure for table `evento` */

DROP TABLE IF EXISTS `evento`;

CREATE TABLE `evento` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DATA_HORA` datetime NOT NULL,
  `OS_ID` bigint(20) NOT NULL,
  `TIPO_EVENTO_ID` bigint(20) NOT NULL,
  `OBSERVACAO` varchar(255) DEFAULT NULL,
  `TECNICO_ID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_OS_ID` (`OS_ID`),
  KEY `FK_TIPO_EVENTO_ID` (`TIPO_EVENTO_ID`),
  KEY `FK_TECNICO` (`TECNICO_ID`),
  CONSTRAINT `FK_OS_ID` FOREIGN KEY (`OS_ID`) REFERENCES `os` (`ID`),
  CONSTRAINT `FK_TECNICO` FOREIGN KEY (`TECNICO_ID`) REFERENCES `tecnico` (`ID`),
  CONSTRAINT `FK_TIPO_EVENTO_ID` FOREIGN KEY (`TIPO_EVENTO_ID`) REFERENCES `tipo_evento` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=latin1;

/*Data for the table `evento` */

/*Table structure for table `os` */

DROP TABLE IF EXISTS `os`;

CREATE TABLE `os` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NUMERO` bigint(20) NOT NULL,
  `DATA_ABERTURA` datetime NOT NULL,
  `CLIENTE_ID` bigint(20) NOT NULL,
  `PROBLEMA_ID` bigint(20) DEFAULT NULL,
  `OUTRO_PROBLEMA` varchar(255) DEFAULT NULL,
  `DETALHES` varchar(255) DEFAULT NULL,
  `OBSERVACAO` varchar(255) DEFAULT NULL,
  `CLIENTE_NAO_CADASTRADO` varchar(255) DEFAULT NULL,
  `TECNICO_ID` bigint(20) DEFAULT NULL,
  `SITUACAO_ID` bigint(20) NOT NULL,
  `PROVEDOR_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_PROVEDOR_ID` (`PROVEDOR_ID`),
  KEY `FK_SITUACAO_ID` (`SITUACAO_ID`),
  KEY `FK_TECNICO_ID` (`TECNICO_ID`),
  KEY `FK_PROBLEMA_ID` (`PROBLEMA_ID`),
  KEY `FK_CLIENTE_ID` (`CLIENTE_ID`),
  CONSTRAINT `FK_CLIENTE_ID` FOREIGN KEY (`CLIENTE_ID`) REFERENCES `cliente` (`ID`),
  CONSTRAINT `FK_PROBLEMA_ID` FOREIGN KEY (`PROBLEMA_ID`) REFERENCES `problema_os` (`ID`),
  CONSTRAINT `FK_PROVEDOR_ID` FOREIGN KEY (`PROVEDOR_ID`) REFERENCES `provedor` (`ID`),
  CONSTRAINT `FK_SITUACAO_ID` FOREIGN KEY (`SITUACAO_ID`) REFERENCES `situacao_os` (`ID`),
  CONSTRAINT `FK_TECNICO_ID` FOREIGN KEY (`TECNICO_ID`) REFERENCES `tecnico` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=latin1;

/*Data for the table `os` */

/*Table structure for table `perfil` */

DROP TABLE IF EXISTS `perfil`;

CREATE TABLE `perfil` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(50) NOT NULL,
  `DESCRICAO` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `perfil` */

/*Table structure for table `problema_os` */

DROP TABLE IF EXISTS `problema_os`;

CREATE TABLE `problema_os` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `TITULO` varchar(100) NOT NULL,
  `DESCRICAO` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `problema_os` */

insert  into `problema_os`(`ID`,`TITULO`,`DESCRICAO`) values (1,'Sem internet','Não consegue acessar a internet'),(2,'Cabo partido','Foi identificado o cabo partido'),(3,'Internet lenta','Tem internet mas está lenta'),(4,'Modem travado','O modem está travado com todas as luzes acessas'),(5,'Outros','Informar outros motivos não listados acima');

/*Table structure for table `provedor` */

DROP TABLE IF EXISTS `provedor`;

CREATE TABLE `provedor` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(50) NOT NULL,
  `DESCRICAO` varchar(255) NOT NULL,
  `SITUACAO` char(1) NOT NULL,
  `BD_NOME` varchar(100) DEFAULT NULL,
  `BD_URL` varchar(100) DEFAULT NULL,
  `BD_PORTA` varchar(10) DEFAULT NULL,
  `BD_USUARIO` varchar(100) DEFAULT NULL,
  `BD_SENHA` varchar(100) DEFAULT NULL,
  `BD_TABLE` varchar(50) DEFAULT NULL,
  `BD_COLUMN_IDENTIFY` varchar(100) DEFAULT NULL,
  `BD_SELECT` varchar(255) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `TELEFONE_CONTATO` varchar(20) DEFAULT NULL,
  `CELULAR_CONTATO` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `provedor` */

insert  into `provedor`(`ID`,`NOME`,`DESCRICAO`,`SITUACAO`,`BD_NOME`,`BD_URL`,`BD_PORTA`,`BD_USUARIO`,`BD_SENHA`,`BD_TABLE`,`BD_COLUMN_IDENTIFY`,`BD_SELECT`,`EMAIL`,`TELEFONE_CONTATO`,`CELULAR_CONTATO`) values (1,'Lagoa NET','Provedor nacidade de Lagoa de Itaenga','A','mkradius','45.234.10.18','3306','helpnet','h3lpn3ts','sis_cliente','cpf_cnpj','SELECT id, nome, cpf_cnpj, nome_res, fone, celular, login, email, endereco, numero, bairro, cidade, estado, cep, bloqueado, cli_ativado, cadastro','contato@lagoanet-pe.com.br','(81) 3621-9287','(81) 98914-3502'),(2,'Teste','Provedor Teste','A','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa','aaa');

/*Table structure for table `situacao_os` */

DROP TABLE IF EXISTS `situacao_os`;

CREATE TABLE `situacao_os` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `SITUACAO` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `situacao_os` */

insert  into `situacao_os`(`ID`,`SITUACAO`) values (1,'Aberta'),(2,'Em análise'),(3,'Com impedimento'),(4,'Concluído');

/*Table structure for table `tecnico` */

DROP TABLE IF EXISTS `tecnico`;

CREATE TABLE `tecnico` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(100) NOT NULL,
  `CPF` varchar(11) NOT NULL,
  `USUARIO_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_USUARIO_ID` (`USUARIO_ID`),
  CONSTRAINT `FK_USUARIO_ID` FOREIGN KEY (`USUARIO_ID`) REFERENCES `usuario` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `tecnico` */

insert  into `tecnico`(`ID`,`NOME`,`CPF`,`USUARIO_ID`) values (1,'Homar','22222222222',2),(2,'Jose','33333333333',3);

/*Table structure for table `tipo_evento` */

DROP TABLE IF EXISTS `tipo_evento`;

CREATE TABLE `tipo_evento` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `EVENTO` varchar(100) NOT NULL,
  `DESCRICAO` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `tipo_evento` */

insert  into `tipo_evento`(`ID`,`EVENTO`,`DESCRICAO`) values (1,'Abrir OS','Abertura de OS pelo cliente'),(2,'Colocar OS em atendimento','Associar um técnico a OS'),(3,'Colocar OS em impedimento','Colocar uma OS em impedimento'),(4,'Fechar OS','Encerrar uma OS '),(5,'Alterar o Técnico da OS','Alterar o Técnico da OS');

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `LOGIN` varchar(50) NOT NULL,
  `SENHA` varchar(50) NOT NULL,
  `PERFIL` varchar(50) NOT NULL,
  `NOME` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `usuario` */

insert  into `usuario`(`ID`,`LOGIN`,`SENHA`,`PERFIL`,`NOME`) values (1,'jns','jns','Administrador','Julio'),(2,'hof','hof','Tecnico','Homar'),(3,'jos','jos','Cliente','Jose');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
