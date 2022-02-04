package pl.polsl.pai.employees.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.pai.employees.model.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("http://localhost:4200/")
@RestController
public class EmployeeController {
    private final EmployeesRepository employeesRepository;
    private final DepartmentRepository departmentRepository;
    private final AddressRepository addressRepository;

    public EmployeeController(EmployeesRepository employeesRepository, DepartmentRepository departmentRepository, AddressRepository addressRepository) {
        this.employeesRepository = employeesRepository;
        this.departmentRepository = departmentRepository;
        this.addressRepository = addressRepository;
    }

    @GetMapping("/employees")
    ResponseEntity<?> readAllEmployees() {
        return ResponseEntity.ok(employeesRepository.findAll());
    }

    @PostMapping("/employees")
    ResponseEntity<?> addEmployee(@RequestBody @Valid Employee employee) {
        if (!addressRepository.existsById(employee.getAddrId())) {
            employee.setAddrId(1); //assign to "Empty address"
        }
        if (!departmentRepository.existsById(employee.getDeptId())) {
            employee.setDeptId(1); //assign to "Not Assigned"
        }
        employeesRepository.save(employee);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/employees/{id}")
    ResponseEntity<?> getEmployee(@PathVariable int id) {
        if (!employeesRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employeesRepository.findById(id));
    }

    @DeleteMapping("/employees/{id}")
    ResponseEntity<?> deleteEmployee(@PathVariable int id) {
        if (!employeesRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Integer addrId = employeesRepository.getById(id).getAddrId();
        employeesRepository.deleteById(id);
        List<Employee> employeesRepositoryAll = employeesRepository.findAll();
        for(Employee employee : employeesRepositoryAll){
            if(employee.getAddrId() == addrId || addrId == 1){
                return ResponseEntity.ok("Employee deleted, address still exist");
            }
        }
        addressRepository.deleteById(addrId);
        return ResponseEntity.ok("Employee deleted, address deleted");
    }

    @PutMapping("/employees/{id}")
    ResponseEntity<?> updateEmployee(@PathVariable int id, @RequestBody @Valid Employee employee) {
        if (!employeesRepository.existsById(id) || id != employee.getId()) {
            return ResponseEntity.notFound().build();
        }
        if (!addressRepository.existsById(employee.getAddrId())) {
            employee.setAddrId(1); //assign to "Empty address"
        }
        if (!departmentRepository.existsById(employee.getDeptId())) {
            employee.setDeptId(1); //assign to "Not Assigned"
        }
        employeesRepository.save(employee);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/departments")
    ResponseEntity<?> readAllDepartments() {
        return ResponseEntity.ok(departmentRepository.findAll());
    }

    @PostMapping("/departments")
    ResponseEntity<?> addDepartment(@RequestBody @Valid Department department) {
        if (!departmentRepository.existsById(department.getMasterDept())) {
            department.setMasterDept(1);
        }
        departmentRepository.save(department);
        return ResponseEntity.ok(department);

    }

    @GetMapping("/departments/{id}")
    ResponseEntity<?> getDepartment(@PathVariable int id) {
        if (!departmentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(departmentRepository.findById(id));
    }

    @DeleteMapping("/departments/{id}")
    ResponseEntity<?> deleteDepartment(@PathVariable int id) {
        if(id==1){
            return ResponseEntity.internalServerError().body("You can't delete the special department");
        }
        if (!departmentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        departmentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/departments/{id}")
    ResponseEntity<?> updateDepartment(@PathVariable int id, @RequestBody @Valid Department department) {
        if (!departmentRepository.existsById(id) || id != department.getId()) {
            return ResponseEntity.notFound().build();
        }
        if (!departmentRepository.existsById(department.getMasterDept())) {
            department.setMasterDept(1);
        }
        departmentRepository.save(department);
        return ResponseEntity.ok(department);

    }

    @GetMapping("/addresses")
    ResponseEntity<?> readAllAddresses() {
        return ResponseEntity.ok(addressRepository.findAll());
    }

    @PostMapping("/addresses")
    ResponseEntity<?> addAddress(@RequestBody @Valid Address address) {
        if (addressRepository.existsById(address.getId())) {
            return ResponseEntity.badRequest().build();
        }
        try {
            addressRepository.save(address);
            return ResponseEntity.ok(address);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/addresses/{id}")
    ResponseEntity<?> getAddress(@PathVariable int id) {
        if (!addressRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(addressRepository.findById(id));
    }

    @DeleteMapping("/addresses/{id}")
    ResponseEntity<?> deleteAddress(@PathVariable int id) {
        if(id==1){
            return ResponseEntity.internalServerError().body("You can't delete the special address");
        }
        if (!addressRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        addressRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/addresses/{id}")
    ResponseEntity<?> updateAddress(@PathVariable int id, @RequestBody @Valid Address address) {
        if (!addressRepository.existsById(id) || id != address.getId()) {
            return ResponseEntity.notFound().build();
        }
        addressRepository.save(address);
        return ResponseEntity.ok(address);
    }
}
