CREATE DATABASE IF NOT EXISTS integrando-db;

CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON integrando-db.* TO 'admin'@'%';

-- Asegurarse de que los privilegios estén aplicados
FLUSH PRIVILEGES;