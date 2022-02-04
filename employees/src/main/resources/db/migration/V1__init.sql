DROP TABLE IF EXISTS employees;
CREATE TABLE employees (
	id				INT PRIMARY KEY AUTO_INCREMENT,
	firstname 		VARCHAR(255) NOT NULL,
    lastname 		VARCHAR(255) NOT NULL,
    addrid			INT NOT NULL,
    dateofbirth		DATE NOT NULL,
    pesel			VARCHAR(255) NOT NULL,
    salary			FLOAT(2) NOT NULL,
    deptid			INT NOT NULL
    );

DROP TABLE IF EXISTS addresses;
CREATE TABLE addresses (
    id				INT PRIMARY KEY AUTO_INCREMENT,
    country         VARCHAR(255) NOT NULL,
    cityname        VARCHAR(255) NOT NULL,
    streetname      VARCHAR(255) NOT NULL,
    streetnumber    VARCHAR(255) NOT NULL,
    locnumber       VARCHAR(255)
);

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    masterdept      INT,
    deptname        VARCHAR(255)
)
