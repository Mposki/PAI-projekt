ALTER TABLE employees ADD FOREIGN KEY (deptid) REFERENCES departments(id);
ALTER TABLE employees ADD FOREIGN KEY (addrid) REFERENCES addresses(id);
