--
-- File generated with SQLiteStudio v3.3.3 on ter out 18 19:14:44 2022
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: usuarios
CREATE TABLE usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT (50) NOT NULL, sexo TEXT (10), email TEXT (20), senha VARCHAR (60), usoLocalizacao VARCHAR (3), tipoUsuario VARCHAR (20), idade DATE (3));

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
