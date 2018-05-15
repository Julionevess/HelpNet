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

/*Table structure for table `evento` */

DROP TABLE IF EXISTS `evento`;

CREATE TABLE `evento` (
  `ID` bigint(20) NOT NULL auto_increment,
  `DATA_HORA` datetime NOT NULL,
  `OS_ID` bigint(20) NOT NULL,
  `TITULO` varchar(100) NOT NULL,
  `DESCRICAO` varchar(255) default NULL,
  `TÉCNICO_ID` bigint(20) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `evento` */

/*Table structure for table `os` */

DROP TABLE IF EXISTS `os`;

CREATE TABLE `os` (
  `ID` bigint(20) NOT NULL auto_increment,
  `NUMERO` bigint(20) default NULL,
  `DATA_ABERTURA` datetime default NULL,
  `CLIENTE_ID` bigint(20) default NULL,
  `PROBLEMA_ID` bigint(20) default NULL,
  `OUTRO_PROBLEMA` varchar(255) default NULL,
  `DETALHES` varchar(255) default NULL,
  `OBSERVACAO` varchar(255) default NULL,
  `CLIENTE_NAO_CADASTRADO` varchar(255) default NULL,
  `TECNICO_RESPONSAVEL_ID` bigint(20) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `os` */

insert  into `os`(`ID`,`NUMERO`,`DATA_ABERTURA`,`CLIENTE_ID`,`PROBLEMA_ID`,`OUTRO_PROBLEMA`,`DETALHES`,`OBSERVACAO`,`CLIENTE_NAO_CADASTRADO`,`TECNICO_RESPONSAVEL_ID`) values (1,20181005001,'2018-05-10 06:00:00',1,1,NULL,'sem conseguir acessar','Não vou estar em casa pela manhã',NULL,1),(2,20181005002,'2018-05-10 08:30:00',2,2,NULL,NULL,NULL,NULL,1),(3,20181005003,'2018-05-09 08:30:00',0,NULL,'Não sei qual o problema','Não estou coneguinto acessar',NULL,'JOsé da venda',0);

/*Table structure for table `perfil` */

DROP TABLE IF EXISTS `perfil`;

CREATE TABLE `perfil` (
  `ID` bigint(20) NOT NULL auto_increment,
  `NOME` varchar(50) NOT NULL,
  `DESCRICAO` varchar(50) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `perfil` */

insert  into `perfil`(`ID`,`NOME`,`DESCRICAO`) values (1,'Admin','Administrador do sistema'),(2,'Tecnico','Técnico do provedor'),(3,'Cliente','Cliente do provedor');

/*Table structure for table `pessoa` */

DROP TABLE IF EXISTS `pessoa`;

CREATE TABLE `pessoa` (
  `ID` bigint(20) NOT NULL auto_increment,
  `NOME` varchar(100) NOT NULL,
  `CPF` varchar(11) NOT NULL,
  `USUARIO_ID` bigint(20) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `pessoa` */

insert  into `pessoa`(`ID`,`NOME`,`CPF`,`USUARIO_ID`) values (1,'Julio','11111111111',1),(2,'Homar','22222222222',2),(3,'José','33333333333',3);

/*Table structure for table `problema` */

DROP TABLE IF EXISTS `problema`;

CREATE TABLE `problema` (
  `ID` bigint(20) NOT NULL auto_increment,
  `TITULO` varchar(100) NOT NULL,
  `DESCRICAO` varchar(255) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `problema` */

insert  into `problema`(`ID`,`TITULO`,`DESCRICAO`) values (1,'Fio partido','O fio está partido e não está chegando internet na casa do cliente'),(2,'Sem acesso a internet','Apesar de estar conectado, a internet não está funcionando');

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

insert  into `usuario`(`ID`,`LOGIN`,`SENHA`,`PERFIL`,`NOME`) values (1,'julio','jns','1','Julio N'),(2,'Homar','hof','3','Homar M'),(3,'jose','jose','2','Zezinho');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
