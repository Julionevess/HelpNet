CREATE USER 'USER'@'%' IDENTIFIED BY PASSWORD '*1CB5E87D1AC373B15CC3242A8FF8551AF662771E';
GRANT SELECT ON BASE . * TO 'USER'@'%';
FLUSH PRIVILEGES; 

SHOW GRANTS FOR helpnet;
SHOW GRANTS FOR helpnet@localhost;


