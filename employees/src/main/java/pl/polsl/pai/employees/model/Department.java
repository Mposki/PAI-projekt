package pl.polsl.pai.employees.model;

import javax.persistence.*;

@Entity
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "masterdept")
    private int masterDept;
    @Column(name = "deptname")
    private String deptName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMasterDept() {
        return masterDept;
    }

    public void setMasterDept(int masterDept) {
        this.masterDept = masterDept;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }
}
