import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError, map } from 'rxjs';
import { Employee } from '../interface/employee';
import { environment } from 'src/environments/environment.prod';
import { Errorlog } from '../interface/errorlog';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  emergencyText: string = "emergency";
  rfidNumber: string | undefined;
  fingerprintUI!: string;

  specialRFID = [
    {
      admin: "0909314995",
      shutdown: "0915014675",
      rebooot: "1876079546"
    }

  ];


  setRfid(rfid: string) {
    this.rfidNumber = rfid;
  }


  apiUrl = `${environment.baseURL}api/employee`
  private errorLogUrl = `${this.apiUrl}/error-logs`; // Endpoint for error logging
  private employeeSubject: BehaviorSubject<Employee | null> = new BehaviorSubject<Employee | null>(null);
  public employee$: Observable<Employee | null> = this.employeeSubject.asObservable();

  constructor(private http: HttpClient) { }

  logError(error: { errorType: string; message: string }): Observable<Errorlog> {
    return this.http.post<Errorlog>(this.errorLogUrl, error).pipe(
      catchError(err => {
        console.error('Error logging errorlogs:', err);
        return throwError('Error logging errorlogs');
      })
    );
  }

  verifyRfid(rfidInput: string): Observable<any> {
    const url = `${this.apiUrl}/rfid/${rfidInput}`;
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        // Handle successful response
        console.log('RFID verified:', response);
        // Example: Store employee and RFID data in service for later use
        this.setEmployee(response);
        this.setRfid(rfidInput);
        this.fingerprintUI = response.fingerprint; // Store the fingerprint
        return response; // Pass data to the subscriber
      }),
      catchError((error: HttpErrorResponse) => {
        // Log the error for debugging
        console.error('Error verifying RFID:', error);
        if (error.status === 404 && error.error.message === 'Employee not found for RFID tag') {
          return throwError('Employee not found.'); // Pass custom error message to the subscriber
        } else if (error.status === 400 && error.error.message === 'Employee has no fingerprint') {
          return throwError('Employee has no fingerprint.'); // Pass custom error message to the subscriber
        } 
        else if (error.status === 400 && error.error.message === 'User is an Intern') {
          return throwError('User is an Intern'); // Pass custom error message to the subscriber
        }else {
          return throwError('An error occurred.'); // Pass generic error message to the subscriber
        }
      })
    );
  }


  confirmEmployee(fingerprint: string, rfid: string): Observable<Employee> {
    const loginEmployeeUrl = `${this.apiUrl}/log-access`;
    return this.http.post<Employee>(loginEmployeeUrl, { rfid, fingerprint }).pipe(
      catchError(err => {
        console.error('Error Fingerprint not match:', err);
        return throwError('Error Fingerprint not match:');
      })
    );
  }


  setEmployee(employee: Employee) {
    this.employeeSubject.next(employee);
  }

  getRfid(): string {
    return this.rfidNumber || '';
  }
}
