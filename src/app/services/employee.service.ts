import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError, map } from 'rxjs';
import { Employee } from '../interface/employee';
import { environment } from 'src/environments/environment.prod';

interface Access {
  internRFID: string;
  school: string;
}


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
    }

  ];

  ojtAccess: Access[] = [
    {
      internRFID: "123",
      school: "UM"
    }, 
    {
      internRFID: "321",
      school: "Caraga"
    }, 
    {
      internRFID: "12345",
      school: "STI"
    }, 
    {
      internRFID: "123456",
      school: "UP"
    }
  ];

  findInternRFID(rfid: string):  Access | undefined {
    return this.ojtAccess.find(item => item.internRFID === rfid);
  }

  findSchoolByRFID(rfid: string | undefined, accessList: Access[]): string | undefined {
    const foundItem = accessList.find(item => item.internRFID === rfid);
    return foundItem ? foundItem.school : undefined;
  }

  

  setRfid(rfid: string) {
    this.rfidNumber = rfid;
  }


  apiUrl = `${environment.baseURL}api/employee`
  private employeeSubject: BehaviorSubject<Employee | null> = new BehaviorSubject<Employee | null>(null);
  public employee$: Observable<Employee | null> = this.employeeSubject.asObservable();

  constructor(private http: HttpClient) { }


  // verifyRfid(rfidTag: string): Observable<Employee> {
  //   const url = `${this.apiUrl}/rfid/${rfidTag}`;
  //   return this.http.get<Employee>(url).pipe(
  //     catchError(err => {
  //       console.error('Error verifying RFID:', err);
  //       return throwError('');
  //     })
  //   );
  // }

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

        // Handle different types of errors based on status code and message
        if (error.status === 404 && error.error.message === 'Employee not found for RFID tag') {
          return throwError('Employee not found.'); // Pass custom error message to the subscriber
        } else if (error.status === 400 && error.error.message === 'Employee has no fingerprint') {
          return throwError('Employee has no fingerprint.'); // Pass custom error message to the subscriber
        } else {
          return throwError('An error occurred.'); // Pass generic error message to the subscriber
        }
      })
    );
  }

  // confirmEmployee(rfidValue: string): Observable<Employee>{
  //   const loginEmployeeUrl = `${this.apiUrl}/log-access`;
  //   return this.http.post<Employee>(loginEmployeeUrl, { fingerprint: rfidValue });
  // }

  confirmEmployee(rfid: string, fingerprint: string): Observable<Employee> {
    const loginEmployeeUrl = `${this.apiUrl}/log-access`;
    return this.http.post<Employee>(loginEmployeeUrl, { rfid, fingerprint }).pipe(
      catchError(err => {
        console.error('Error logging employee access:', err);
        return throwError('Error logging employee access');
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
