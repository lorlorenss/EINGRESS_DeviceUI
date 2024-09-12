import { Injectable } from '@angular/core';
import { Errorlog } from '../interface/errorlog';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {

  private errorLogUrl = `${environment.baseURL}api/error-logs`; // Adjust the base URL if needed

  constructor(private http: HttpClient) { }

  logError(errorMessage: string): Observable<Errorlog> {
    const errorLogData: Partial<Errorlog> = {
      errorType: 'API Error', // Set appropriate error type
      message: errorMessage,
    };

    return this.http.post<Errorlog>(this.errorLogUrl, errorLogData).pipe(
      catchError(err => {
        console.error('Error logging errorlogs:', err);
        return throwError('Error logging errorlogs');
      })
    );
  }
}
