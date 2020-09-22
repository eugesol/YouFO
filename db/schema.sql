---Procedure for Injesting sanitized csv file---

--Create Table
CREATE DATABASE zebra;
USE zebra;

--run server.js
#node server.js

--alter sightings table:
#alter table sightings
 CHANGE COLUMN createdAt createdAt DATETIME NOT  NULL DEFAULT current_timestamp
 
 
#alter table sightings
 CHANGE COLUMN updatedAt updatedAt DATETIME NOT NULL DEFAULT current_timestamp
 
--confirm default upload directory 
SHOW VARIABLES LIKE "secure_file_priv";

--upload sanitized.csv file to this directory

-- Load file with the below command
 
LOAD DATA INFILE '<upload directory>/sanitized.csv' 
INTO TABLE sightings
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;