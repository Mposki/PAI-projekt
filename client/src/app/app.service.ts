import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./model/employee";
import {Department} from "./model/department";
import {Address} from "./model/address";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiURLlocal = '';
  private apiURLprod = '';

  constructor(private http: HttpClient) {
    this.apiURLlocal = 'http://localhost:8080';
    this.apiURLprod = '';
  }

  public getAllEmployees(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(`${this.apiURLlocal}/employees`);
  }

  public saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiURLlocal}/employees`, employee);
  }

  public getSelectedEmployee(employeeID: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiURLlocal}/employees/${employeeID}`);
  }

  public deleteEmployee(employeeID: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURLlocal}/employees/${employeeID}`);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiURLlocal}/employees/${employee.id}`, employee);
  }

}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiURLlocal = '';
  private apiURLprod = '';

  constructor(private http: HttpClient) {
    this.apiURLlocal = 'http://localhost:8080';
    this.apiURLprod = '';
  }

  public getAllAddresses(): Observable<Array<Address>> {
    return this.http.get<Array<Address>>(`${this.apiURLlocal}/addresses`);
  }

  public saveAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiURLlocal}/addresses`, address);
  }

  public getSelectedAddress(addressID: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiURLlocal}/addresses/${addressID}`);
  }

  public deleteAddress(addressID: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURLlocal}/addresses/${addressID}`);
  }

  public updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiURLlocal}/addresses/${address.id}`, address);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiURLlocal = '';
  private apiURLprod = '';

  constructor(private http: HttpClient) {
    this.apiURLlocal = 'http://localhost:8080';
    this.apiURLprod = '';
  }

  public getAllDepartments(): Observable<Array<Department>> {
    return this.http.get<Array<Department>>(`${this.apiURLlocal}/departments`);
  }

  public saveDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiURLlocal}/departments`, department);
  }

  public getSelectedDepartment(departmentID: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiURLlocal}/departments/${departmentID}`);
  }

  public deleteDepartment(departmentID: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURLlocal}/departments/${departmentID}`);
  }

  public updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiURLlocal}/departments/${department.id}`, department);
  }

}
