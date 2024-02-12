import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class timetableService {
  
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTimetable(): Observable<any> {
    return this.http.get(`${this.apiUrl}/timetable`).pipe(
      catchError(error => {
        console.error('Error getting timetable:', error);
        return throwError('Something went wrong while fetching timetable data.');
      })
    );
  }

  addSubject(tableform: FormGroup): Observable<any> {
    return this.http.post(`${this.apiUrl}/subjectable`, tableform.value).pipe(
      catchError(error => {
        console.error('Error adding subject:', error);
        return throwError('Something went wrong while adding subject.');
      })
    );
  }

  viewSubject(): Observable<any> {
    return this.http.get(`${this.apiUrl}/subjectable`)
  }
}
