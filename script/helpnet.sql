/*
SQLyog Trial v13.0.1 (64 bit)
MySQL - 5.0.51b-community-nt : Database - helpnet
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`helpnet` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `helpnet`;

/*Table structure for table `evento` */

DROP TABLE IF EXISTS `evento`;

CREATE TABLE `evento` (
  `ID` bigint(20) NOT NULL auto_increment,
  `DATA_HORA` datetime NOT NULL,
  `OS_ID` bigint(20) NOT NULL,
  `TITULO` varchar(100) NOT NULL,
  `DESCRICAO` varchar(255) default NULL,
  `TECNICO_ID` bigint(20) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `evento` */

insert  into `evento`(`ID`,`DATA_HORA`,`OS_ID`,`TITULO`,`DESCRICAO`,`TECNICO_ID`) values 
(1,'2018-05-14 12:22:25',1,'ATRIBUIR TECNICO','CHECAR O PROBLEMA',1),
(2,'2018-05-14 12:33:24',6,'titulo','descrição...',2),
(3,'2018-05-14 13:30:42',6,'titulo','descrição...',2),
(4,'2018-05-14 13:31:39',7,'titulo','descrição...',2),
(5,'2018-05-14 13:52:34',8,'titulo','descrição...',2),
(6,'2018-05-15 13:25:53',8,'titulo','descrição...',2),
(7,'2018-05-15 13:26:39',8,'titulo','descrição...',2);

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
  `TECNICO_RESPONSAVEL_ID` bigint(20) default NULL,
  `SITUACAO_ID` bigint(20) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

/*Data for the table `os` */

insert  into `os`(`ID`,`NUMERO`,`DATA_ABERTURA`,`CLIENTE_ID`,`PROBLEMA_ID`,`OUTRO_PROBLEMA`,`DETALHES`,`OBSERVACAO`,`CLIENTE_NAO_CADASTRADO`,`TECNICO_RESPONSAVEL_ID`,`SITUACAO_ID`) values 
(1,20181005001,'2018-05-10 06:00:00',1,1,NULL,'sem conseguir acessar','Não vou estar em casa pela manhã',NULL,1,0),
(2,20181005002,'2018-05-10 08:30:00',2,2,NULL,NULL,NULL,NULL,1,0),
(3,20181005003,'2018-05-09 08:30:00',0,1,'Não sei qual o problema','Não estou coneguinto acessar',NULL,'JOsé da venda',1,0),
(4,1111,'2018-05-14 07:25:03',1,1,NULL,'ASASASASAS',NULL,NULL,1,0),
(5,2018051401,'2018-05-14 07:49:46',1,2,NULL,'meu problem é ...',NULL,NULL,NULL,0),
(6,2018051401,'2018-05-14 08:00:57',1,2,NULL,'meu problem é ...',NULL,NULL,2,0),
(7,2018051401,'2018-05-14 11:59:44',1,2,NULL,'meu problem é ...',NULL,NULL,2,0),
(8,2018051401,'2018-05-14 13:49:53',1,2,NULL,'meu problem é ...',NULL,NULL,NULL,1),
(9,2018051401,'2018-05-14 13:51:50',1,2,NULL,'meu problem é ...',NULL,NULL,NULL,1),
(10,2018051401,'2018-05-14 13:52:34',1,2,NULL,'meu problem é ...',NULL,NULL,NULL,1),
(11,2018051401,'2018-05-15 13:25:53',1,2,NULL,'meu problem é ...',NULL,NULL,NULL,1),
(12,2018051401,'2018-05-15 13:26:39',1,2,NULL,'meu problem é ...',NULL,NULL,NULL,1);

/*Table structure for table `perfil` */

DROP TABLE IF EXISTS `perfil`;

CREATE TABLE `perfil` (
  `ID` bigint(20) NOT NULL auto_increment,
  `NOME` varchar(50) NOT NULL,
  `DESCRICAO` varchar(50) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `perfil` */

insert  into `perfil`(`ID`,`NOME`,`DESCRICAO`) values 
(1,'Admin','Administrador do sistema'),
(2,'Tecnico','Técnico do provedor'),
(3,'Cliente','Cliente do provedor');

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

insert  into `pessoa`(`ID`,`NOME`,`CPF`,`USUARIO_ID`) values 
(1,'Julio','11111111111',1),
(2,'Homar','22222222222',2),
(3,'José','33333333333',3);

/*Table structure for table `problema` */

DROP TABLE IF EXISTS `problema`;

CREATE TABLE `problema` (
  `ID` bigint(20) NOT NULL auto_increment,
  `TITULO` varchar(100) NOT NULL,
  `DESCRICAO` varchar(255) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `problema` */

insert  into `problema`(`ID`,`TITULO`,`DESCRICAO`) values 
(1,'Fio partido','O fio está partido e não está chegando internet na casa do cliente'),
(2,'Sem acesso a internet','Apesar de estar conectado, a internet não está funcionando');

/*Table structure for table `situacao_os` */

DROP TABLE IF EXISTS `situacao_os`;

CREATE TABLE `situacao_os` (
  `ID` bigint(20) NOT NULL auto_increment,
  `SITUACAO` varchar(255) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `situacao_os` */

insert  into `situacao_os`(`ID`,`SITUACAO`) values 
(1,'Aberta'),
(2,'Em andamento'),
(3,'Com impedimento'),
(4,'Fechada');

/*Table structure for table `tipo_evento` */

DROP TABLE IF EXISTS `tipo_evento`;

CREATE TABLE `tipo_evento` (
  `ID` bigint(20) NOT NULL auto_increment,
  `EVENTO` varchar(100) NOT NULL,
  `DESCRICAO` varchar(255) NOT NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tipo_evento` */

insert  into `tipo_evento`(`ID`,`EVENTO`,`DESCRICAO`) values 
(1,'Abrir uma OS','Quando uma OS for aberta por um cliente'),
(2,'Atribuir Técnico','Atribuir o técnico pela primeira vez a OS'),
(3,'Alterar Técnico','Mudar o técnico da OS'),
(4,'Encerrar uma OS','Quando uma OS for finalizada');

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

insert  into `usuario`(`ID`,`LOGIN`,`SENHA`,`PERFIL`,`NOME`) values 
(1,'julio','jns','1','Julio N'),
(2,'Homar','hof','3','Homar M'),
(3,'jose','jose','2','Zezinho');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
