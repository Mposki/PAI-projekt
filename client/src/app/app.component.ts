import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Employee} from "./model/employee";
import {EmployeeService, AddressService, DepartmentService} from "./app.service"
import {Address} from "./model/address";
import {Department} from "./model/department";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PAI-projekt';
  employeeTable: MatTableDataSource<Employee>;
  employeeArray: Array<Employee>;
  selectedEmployee: Employee;
  selectedEmployeeAddress: Address;
  selectedEmployeeDepartment: Department;
  departmentsArray: Array<Department>
  displayedEmployeeColumns: string[] = ['id', 'name', 'surname'];
  displayedDepartmentColumns: string[] = ['masterDept', 'deptName'];
  departmentTable: MatTableDataSource<Department>;
  constructor(public dialog: MatDialog,
              public employeeService: EmployeeService,
              public addressService: AddressService,
              public departmentService: DepartmentService) {
    this.selectedEmployee = {} as Employee;
    this.selectedEmployeeAddress = {} as Address;
    this.selectedEmployeeDepartment = {} as Department;
    this.employeeArray = [];
    this.departmentsArray = [];
    this.employeeTable = new MatTableDataSource<Employee>(this.employeeArray);
    this.departmentTable = new MatTableDataSource<Department>(this.departmentsArray);
    this.refreshEmployees(0);
    this.getDepartments();
  }

  // refreshEmployees(idSelectedEmployee: number): void {
  //   this.getEmployees();
  //   this.loadFullEmployeeData(idSelectedEmployee);
  // }

  refreshEmployees(idSelectedEmployee: number): void {
    this.employeeService.getAllEmployees().subscribe(
      response => {
        this.employeeArray = response;
        console.log(this.employeeArray);
        this.employeeTable = new MatTableDataSource<Employee>(this.employeeArray);
        if (this.employeeArray.length != 0) {
          // this.loadFullEmployeeData(this.employeeArray[idSelectedEmployee].id);
          // this.selectedEmployee = this.employeeArray.find(employee => employee.id == idSelectedEmployee)!;
          this.selectedEmployee = this.employeeArray[0];
          console.log(response);
          this.addressService.getSelectedAddress(this.selectedEmployee.addrId).subscribe(
            response => {
              this.selectedEmployeeAddress = response;
              this.departmentService.getSelectedDepartment(this.selectedEmployee.deptId).subscribe(
                response => {
                  this.selectedEmployeeDepartment = response;
                  this.departmentService.getAllDepartments().subscribe(
                    response => {
                      this.departmentsArray = response;
                      this.departmentTable = new MatTableDataSource<Department>(this.departmentsArray);
                      console.log(this.departmentTable)
                      },
                    error => {
                      alert(error.status);
                    }
                  )
                },
                error => {
                  alert(error.status);
                }
              )

            },
            error => {
              alert(error.status);
            }
          )

        } else {

        }
      },
      error => {
        //alert(error.status);
      }
    );
  }

  // getEmployees(): Array<Employee> {
  //   let tempEmployeeArray = [] as Array<Employee>
  //   this.employeeService.getAllEmployees().subscribe(
  //     response => {
  //       console.log(response);
  //       this.loadEmployees(response);
  //       tempEmployeeArray = response
  //     },
  //     error => {
  //       //alert(error.status);
  //     }
  //   );
  //   return tempEmployeeArray;
  // }

  loadFullEmployeeData(idEmployee: number): void {
    this.selectedEmployee = this.employeeArray.find(employee => employee.id == idEmployee)!;
    this.addressService.getSelectedAddress(this.selectedEmployee.addrId).subscribe(
      response => {
        this.selectedEmployeeAddress = response;
        console.log(this.selectedEmployeeAddress);
        this.departmentService.getSelectedDepartment(this.selectedEmployee.deptId).subscribe(
          response => {
            this.selectedEmployeeDepartment = response;
            console.log(this.selectedEmployeeDepartment);
          },
          error => {
            alert(error.status);
          }
        )

      },
      error => {
        alert(error.status);
      }
    )
  }

  async getEmployeeAddress(idAddress: number): Promise<Address> {
    let tempAddress = {} as Address;
    this.addressService.getSelectedAddress(idAddress).subscribe(
      response => {
        tempAddress = response;
      }
    )
    return tempAddress;
  }

  async getEmployeeDepartment(idDepartment: number): Promise<Department> {
    let tempDepartment = {} as Department;
    this.departmentService.getSelectedDepartment(idDepartment).subscribe(
      response => {
        tempDepartment = response;
      },
      error => {
        alert(error.status);
      }
    )
    return tempDepartment;
  }

  getDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      response => {
        this.departmentsArray = response;
        this.departmentTable = new MatTableDataSource<Department>(this.departmentsArray);
      },
      error => {
        alert(error.status);
      }
    )
  }

  getDepartmentName(idDep: number): String {
    try {
      return this.departmentsArray.find(element => element.id == idDep)!.deptName;
      } catch (error) {
      return 'Siedziba główna';
    }
  }

  getSelectedDepartment(id: number): Department {
    return this.departmentsArray.find(department => department.id == id)!;
  }

  addNewEmployee(): void {
    let newEmployee = {} as Employee;
    newEmployee.firstName = '';
    newEmployee.lastName = '';
    newEmployee.salary = 0;
    newEmployee.pesel = '';
//    newEmployee.dateOfBirth = Date();
    const dialogRef = this.dialog.open(EmployeeDialog, {
      width: '500px',
      data: {
        employee: newEmployee,
        departments: this.departmentsArray
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action != 'dismiss') {
        newEmployee = result.data.employee;
        this.addEmployee(newEmployee);
      }
    });
  }

  addEmployee(newEmployee: Employee): void {
    this.employeeService.saveEmployee(newEmployee).subscribe(
      response => {
        this.selectedEmployee = response;
        this.refreshEmployees(this.selectedEmployee.id);
        alert("Dodano nowego pracownika!");
      },
      error => {
        alert(error.status);
      }
    )
  }

  addEmployeeAddress(): void {
    let newAddress = {} as Address;
    const dialogRef = this.dialog.open(AddressDialog, {
      width: '500px',
      data: {
        address: newAddress,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action != 'dismiss') {
        newAddress = result.data.address;
        this.addAddress(newAddress);
      }
    });
  }

  addAddress(address: Address): void {
    this.addressService.saveAddress(address).subscribe(
      response => {
        this.selectedEmployeeAddress = response;
        this.selectedEmployee.addrId = this.selectedEmployeeAddress.id;
        this.editEmployee(this.selectedEmployee);
        this.refreshEmployees(this.selectedEmployee.id);
        alert("Dodano nowy adres!");
      },
      error => {
        alert(error.status);
      }
    )
  }

  addNewDepartment(): void {
    let newDepartment = {} as Department;
    const dialogRef = this.dialog.open(DepartmentDialog, {
      width: '500px',
      data: {
        department: newDepartment,
        departments: this.departmentsArray
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action != 'dismiss') {
        newDepartment = result.data.department;
        this.addDepartment(newDepartment);
      }
    });
  }

  addDepartment(department: Department): void {
    this.departmentService.saveDepartment(department).subscribe(
      response => {
        this.refreshEmployees(this.selectedEmployee.id);
        alert("Dodano nowy dział!");
      },
      error => {
        alert(error.status);
      }
    )
  }

  editEmployeeData(): void {
    let newData = this.selectedEmployee;
    const dialogRef = this.dialog.open(EmployeeDialog, {
      width: '500px',
      data: {
        employee: newData,
        departments: this.departmentsArray
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action != 'dismiss') {
        newData = result.data.employee;
        this.editEmployee(newData);
      }
    });
  }

  editEmployee(newData: Employee): void {
    this.employeeService.updateEmployee(newData).subscribe(
      response => {
        this.refreshEmployees(this.selectedEmployee.id);
        alert("Edycja danych zakończona sukcesem!");
      },
      error => {
        alert(error.status);
      }
    )
  }

  editEmployeeAddress(): void {
    let newAddress = this.selectedEmployeeAddress;
    const dialogRef = this.dialog.open(AddressDialog, {
      width: '500px',
      data: {
        address: newAddress,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action != 'dismiss') {
        newAddress = result.data.address;
        this.editAddress(newAddress);
      }
    });
  }

  editAddress(address: Address): void {
    this.addressService.updateAddress(address).subscribe(
      response => {
        this.refreshEmployees(this.selectedEmployee.id);
        alert("Edycja adresu zakończona sukcesem!");
      },
      error => {
        alert(error.status);
      }
    )
  }

  editDepartmentData(idDepartment: number): void {
    let newDepartment = this.departmentsArray.find(element => element.id == idDepartment)!;
    const dialogRef = this.dialog.open(DepartmentDialog, {
      width: '500px',
      data: {
        department: newDepartment,
        departments: this.departmentsArray
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action != 'dismiss') {
        newDepartment = result.data.department;
        this.editDepartment(newDepartment);
      }
    });
  }


  editDepartment(department: Department): void {
    this.departmentService.updateDepartment(department).subscribe(
      response => {
        this.refreshEmployees(this.selectedEmployee.id);
        alert("Edycja działu zakończona sukcesem!")
      },
      error => {
        alert(error.status);
      }
    )
  }

  deleteEmployee(idEmployee: number): void {
    this.employeeService.deleteEmployee(idEmployee).subscribe(
      response => {
      },
      error => {
        if(error.status == 200) {
          this.refreshEmployees(0);
          alert('Pracownik usunięty!');
        }
        else {
          alert(error.status);
        }
      }
    )
  }
}

@Component({
  selector: 'dialog-employee',
  templateUrl: 'dialog.employee.html',
  styleUrls: ['./app.component.css'],
})
export class EmployeeDialog {
  constructor(
    public dialogRef: MatDialogRef<EmployeeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {employee: Employee, departments: Array<Department>},
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close({
      action: 'dismiss',
    });
  }

  onOkClick(): void {
    this.dialogRef.close({
      action: 'send',
      data: {
        employee: {
          id: this.data.employee.id,
          firstName: this.data.employee.firstName,
          lastName: this.data.employee.lastName,
          dateOfBirth: this.data.employee.dateOfBirth,
          pesel: this.data.employee.pesel,
          salary: this.data.employee.salary,
          deptId: this.data.employee.deptId,
        } as Employee
      }
    });
  }

  validate(): boolean {
    return (this.data.employee.firstName === '' || this.data.employee.firstName.includes(' ')
    || this.data.employee.lastName === '' || this.data.employee.lastName.includes(' ')
    || this.data.employee.pesel === '' || this.data.employee.pesel.includes(' ')
    || this.data.employee.deptId === 0);
  }
}

@Component({
  selector: 'dialog-address',
  templateUrl: 'dialog.address.html',
  styleUrls: ['./app.component.css'],
})
export class AddressDialog {
  constructor(
    public dialogRef: MatDialogRef<AddressDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {address: Address},
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close({
      action: 'dismiss',
    });
  }

  onOkClick(): void {
    this.dialogRef.close({
      action: 'send',
      data: {
        address: {
          id: this.data.address.id,
          cityName: this.data.address.cityName,
          streetName: this.data.address.streetName,
          country: this.data.address.country,
          streetNumber: this.data.address.streetNumber,
          locNumber: this.data.address.locNumber,
        } as Address
      }
    });
  }

  validate(): boolean {
    return (this.data.address.cityName === ''
    || this.data.address.cityName === ''
    || this.data.address.country === ''
    || this.data.address.streetNumber === ''
    || this.data.address.locNumber === '');
  }
}

@Component({
  selector: 'dialog-department',
  templateUrl: 'dialog.department.html',
  styleUrls: ['./app.component.css'],
})
export class DepartmentDialog {
  constructor(
    public dialogRef: MatDialogRef<DepartmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {department: Department, departments: Array<Department>},
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close({
      action: 'dismiss',
    });
  }

  onOkClick(): void {
    this.dialogRef.close({
      action: 'send',
      data: {
        department: {
          id: this.data.department.id,
          deptName: this.data.department.deptName,
          masterDept: this.data.department.masterDept,
        } as Department
      }
    });
  }

  validate(): boolean {
    return (this.data.department.deptName === ''
      || this.data.department.masterDept === 0);
  }
}
