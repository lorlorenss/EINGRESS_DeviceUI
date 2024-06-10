import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from '../interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'api/employee'
  private employeeSubject: BehaviorSubject<Employee | null> = new BehaviorSubject<Employee | null>(null);
  public employee$: Observable<Employee | null> = this.employeeSubject.asObservable();

  constructor(private http: HttpClient) { }

  loginEmployee(rfidValue: string): Observable<any>{
    const loginEmployeeUrl = `${this.apiUrl}/log-access`;
    return this.http.post<any>(loginEmployeeUrl, { rfidTag: rfidValue });
  }

  confirmEmployee(rfidValue: string): Observable<any>{
    const loginEmployeeUrl = `${this.apiUrl}/log-access`;
    return this.http.post<any>(loginEmployeeUrl, { fingerprint: rfidValue });
  }

  setEmployee(employee: Employee){
    this.employeeSubject.next(employee);
  }
}
