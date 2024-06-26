import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';
import { Employee } from '../interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'api/employee'
  private employeeSubject: BehaviorSubject<Employee | null> = new BehaviorSubject<Employee | null>(null);
  public employee$: Observable<Employee | null> = this.employeeSubject.asObservable();

  constructor(private http: HttpClient) { }


  verifyRfid(rfidTag: string): Observable<Employee> {
    const url = `${this.apiUrl}/${rfidTag}`;
    return this.http.get<Employee>(url).pipe(
      catchError(err => {
        console.error('Error verifying RFID:', err);
        return throwError('Error verifying RFID');
      })
    );
  }

  confirmEmployee(rfidValue: string): Observable<any>{
    const loginEmployeeUrl = `${this.apiUrl}/log-access`;
    return this.http.post<any>(loginEmployeeUrl, { fingerprint: rfidValue });
  }

  setEmployee(employee: Employee){
    this.employeeSubject.next(employee);
  }
}
