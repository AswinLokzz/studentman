import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { StudentForm } from '../models/studentform.model';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class StudentFormService {
  private apiUrl = 'http://localhost:3000';
  private StudentForms: StudentForm[] = [];
  private StudentFormsUpdated = new Subject<StudentForm[]>();

  constructor(private http: HttpClient) {}

  getStudentForm() {
    return this.http.get('http://localhost:3000/Students/list');
  }

  addStudent(form: FormGroup): Observable<any> {
    if (form.invalid) {
      console.error('Invalid form data');
      return throwError(undefined);
    }

    const studentform: StudentForm = form.value;

    this.StudentForms.push(studentform);
    this.StudentFormsUpdated.next([...this.StudentForms]);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl}/Students/form`, studentform, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error adding student:', error);
        return throwError(error);
      })
    );
  }

  getFormsUpdatedListener() {
    return this.StudentFormsUpdated.asObservable();
  }
}
