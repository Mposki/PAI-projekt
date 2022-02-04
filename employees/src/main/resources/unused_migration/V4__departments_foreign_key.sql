ALTER TABLE departments ADD FOREIGN KEY (headid) REFERENCES employees(id);
ALTER TABLE departments ADD FOREIGN KEY (masterdept) REFERENCES departments(id);
ALTER TABLE departments ADD FOREIGN KEY (addrid) REFERENCES addresses(id);
