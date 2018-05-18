/*
SQLyog Community Edition- MySQL GUI v6.15
MySQL - 5.0.51b-community-nt : Database - helpnet
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `helpnet`;

USE `helpnet`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `cliente` */

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
  `ID` bigint(20) NOT NULL auto_increment,
  `NOME` varchar(100) NOT NULL,
  `CPF` varchar(11) NOT NULL,
  `USUARIO_ID` bigint(20) NOT NULL,
  PRIMARY KEY  (`ID`),
  KEY `FK_USUARIO` (`USUARIO_ID`),
  CONSTRAINT `FK_USUARIO` FOREIGN KEY (`USUARIO_ID`) REFERENCES `usuario` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `cliente` */

insert  into `cliente`(`ID`,`NOME`,`CPF`,`USUARIO_ID`) values (1,'Jose','2222222222',3);

/*Table structure for table `evento` */

DROP TABLE IF EXISTS `evento`;

CREATE TABLE `evento` (
  `ID` bigint(20) NOT NULL auto_increment,
  `DATA_HORA` datetime NOT NULL,
  `OS_ID` bigint(20) NOT NULL,
  `TIPO_EVENTO_ID` bigint(20) NOT NULL,
  `DESCRICAO` varchar(255) default NULL,
  `TECNICO_ID` bigint(20) NOT NULL,
  PRIMARY KEY  (`ID`),
  KEY `FK_OS_ID` (`OS_ID`),
  KEY `FK_TIPO_EVENTO_ID` (`TIPO_EVENTO_ID`),
  KEY `FK_TECNICO` (`TECNICO_ID`),
  CONSTRAINT `FK_OS_ID` FOREIGN KEY (`OS_ID`) REFERENCES `os` (`ID`),
  CONSTRAINT `FK_TECNICO` FOREIGN KEY (`TECNICO_ID`) REFERENCES `tecnico` (`ID`),
  CONSTRAINT `FK_TIPO_EVENTO_ID` FOREIGN KEY (`TIPO_EVENTO_ID`) REFERENCES `tipo_evento` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `evento` */

/*Table structure for table `os` */

DROP TABLE IF EXISTS `os`;

CREATE TABLE `os` (
  `ID` bigint(20) NOT NULL auto_increment,
  `NUMERO` bigint(20) NOT NULL,
  `DATA_ABERTURA` datetime NOT NULL,
  `CLIENTE_ID` bigint(20) NOT NULL,
  `PROBLEMA_ID` bigint(20) default NULL,
  `OUTRO_PROBLEMA` varchar(255) default NULL,
  `DETALHES` varchar(255) default NULL,
  `OBSERVACAO` varchar(255) default NULL,
  `CLIENTE_NAO_CADASTRADO` varchar(255) default NULL,
  `TECNICO_ID` bigint(20) default NULL,
  `SITUACAO_ID` bigint(20) NOT NULL,
  `PROVEDOR_ID` bigint(20) NOT NULL,
  PRIMARY KEY  (`ID`),
  KEY `FK_PROVEDOR_ID` (`PROVEDOR_ID`),
  KEY `FK_SITUACAO_ID` (`SITUACAO_ID`),
  KEY `FK_TECNICO_ID` (`TECNICO_ID`),
  KEY `FK_PROBLEMA_ID` (`PROBLEMA_ID`),
  KEY `FK_CLIENTE_ID` (`CLIENTE_ID`),
  CONSTRAINT `FK_CLIENTE_ID` FOREIGN KEY (`CLIENTE_ID`) REFERENCES `cliente` (`ID`),
  CONSTRAINT `FK_PROBLEMA_ID` FOREIGN KEY (`PROBLEMA_ID`) REFERENCES `problema` (`ID`),
  CONSTRAINT `FK_PROVEDOR_ID` FOREIGN KEY (`PROVEDOR_ID`) REFERENCES `provedor` (`ID`),
  CONSTRAINT `FK_SITUACAO_ID` FOREIGN KEY (`SITUACAO_ID`) REFERENCES `situacao_os` (`ID`),
  CONSTRAINT `FK_TECNICO_ID` FOREIGN KEY (`TECNICO_ID`) REFERENCES `tecnico` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `os` */

insert  into `os`(`ID`,`NUMERO`,`DATA_ABERTURA`,`CLIENTE_ID`,`PROBLEMA_ID`,`OUTRO_PROBLEMA`,`DETALHES`,`OBSERVACAO`,`CLIENTE_NAO_CADASTRADO`,`TECNICO_ID`,`SITUACAO_ID`,`PROVEDOR_ID`) values (1,2018051401,'2018-05-18 07:42:31',1,2,NULL,'meu problem é ...',NULL,NULL,NULL,1,1),(2,2018051401,'2018-05-18 07:45:06',1,2,NULL,'meu problem é ...',NULL,NULL,NULL,1,1),(3,2018051401,'2018-05-18 07:47:08',1,2,NULL,'meu problem é ...',NULL,NULL,NULL,1,1),(4,2018051401,'2018-05-18 07:47:33',1,2,NULL,'meu problem é ...',NULL,NULL,NULL,1,1);

/*Table structure for table `perfil` */

DROP TABLE IF EXISTS `perfil`;

CREATE TABLE `perfil` (
  `ID` bigint(20) NOT NULL auto_increment,
  `NOME` varchar(50) NOT NULL,
  `DESCRICAO` varchar(50) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `perfil` */

/*Table structure for table `problema` */

DROP TABLE IF EXISTS `problema`;

CREATE TABLE `problema` (
  `ID` bigint(20) NOT NULL auto_increment,
  `TITULO` varchar(100) NOT NULL,
  `DESCRICAO` varchar(255) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `problema` */

insert  into `problema`(`ID`,`TITULO`,`DESCRICAO`) values (1,'Sem internet','Não consegue acessar a internet'),(2,'Cabo partido','Foi identificado o cabo partido'),(3,'Internet lenta','Tem internet mas está lenta');

/*Table structure for table `provedor` */

DROP TABLE IF EXISTS `provedor`;

CREATE TABLE `provedor` (
  `ID` bigint(20) NOT NULL auto_increment,
  `NOME` varchar(50) NOT NULL,
  `DESCRICAO` varchar(255) NOT NULL,
  `SITUACAO` char(1) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `provedor` */

insert  into `provedor`(`ID`,`NOME`,`DESCRICAO`,`SITUACAO`) values (1,'HOF','Homar Net','A');

/*Table structure for table `situacao_os` */

DROP TABLE IF EXISTS `situacao_os`;

CREATE TABLE `situacao_os` (
  `ID` bigint(20) NOT NULL auto_increment,
  `SITUACAO` varchar(255) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `situacao_os` */

insert  into `situacao_os`(`ID`,`SITUACAO`) values (1,'Aberta'),(2,'Em análise'),(3,'Com empedimento'),(4,'Concluído');

/*Table structure for table `tecnico` */

DROP TABLE IF EXISTS `tecnico`;

CREATE TABLE `tecnico` (
  `ID` bigint(20) NOT NULL auto_increment,
  `NOME` varchar(100) NOT NULL,
  `CPF` varchar(11) NOT NULL,
  `USUARIO_ID` bigint(20) NOT NULL,
  PRIMARY KEY  (`ID`),
  KEY `FK_USUARIO_ID` (`USUARIO_ID`),
  CONSTRAINT `FK_USUARIO_ID` FOREIGN KEY (`USUARIO_ID`) REFERENCES `usuario` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `tecnico` */

insert  into `tecnico`(`ID`,`NOME`,`CPF`,`USUARIO_ID`) values (1,'Homar','22222222222',2);

/*Table structure for table `tipo_evento` */

DROP TABLE IF EXISTS `tipo_evento`;

CREATE TABLE `tipo_evento` (
  `ID` bigint(20) NOT NULL auto_increment,
  `EVENTO` varchar(100) NOT NULL,
  `DESCRICAO` varchar(255) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tipo_evento` */

insert  into `tipo_evento`(`ID`,`EVENTO`,`DESCRICAO`) values (1,'Abrir OS','Abertura de OS pelo cliente'),(2,'Colocar OS em atendimento','Associar um técnico a OS'),(3,'Colocar OS em empedimento','Colocar uma OS em empedimento'),(4,'Fechar OS','Encerrar uma OS ');

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `ID` bigint(20) NOT NULL auto_increment,
  `LOGIN` varchar(50) NOT NULL,
  `SENHA` varchar(50) NOT NULL,
  `PERFIL` varchar(50) NOT NULL,
  `NOME` varchar(50) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `usuario` */

insert  into `usuario`(`ID`,`LOGIN`,`SENHA`,`PERFIL`,`NOME`) values (1,'jns','jns','Administrador','Julio'),(2,'hof','hof','Tecnico','Homar'),(3,'jos','jos','Cliente','Jose');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
