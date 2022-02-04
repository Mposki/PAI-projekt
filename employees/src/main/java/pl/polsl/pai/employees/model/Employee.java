package pl.polsl.pai.employees.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    @Column(name = "firstname")
    private String firstName;
    @NotNull
    @Column(name = "lastname")
    private String lastName;
    @NotNull
    @Column(name = "addrid")
    private int addrId;
    @NotNull
    @Column(name = "dateofbirth")
    private Date dateOfBirth;
    @NotNull
    @Column(name = "pesel")
    private String pesel;
    @NotNull
    @Column(name = "salary")
    private float salary;
    @NotNull
    @Column(name = "deptid")
    private int deptId;

    /*@ManyToOne()
    @JoinColumn(name = "addrid")
    private Address address;

    @ManyToOne()
    @JoinColumn(name = "deptid")
    private Department department;*/

    /*public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }*/

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAddrId() {
        return addrId;
    }

    public void setAddrId(int addrId) {
        this.addrId = addrId;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public float getSalary() {
        return salary;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }

    public int getDeptId() {
        return deptId;
    }

    public void setDeptId(int deptId) {
        this.deptId = deptId;
    }
}
