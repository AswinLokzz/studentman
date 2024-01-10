import { Injectable } from '@angular/core';
import { Subject, of, throwError, Observable } from 'rxjs';
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

  addStudent(form: FormGroup, imageFile: File): Observable<any> {
    if (form.invalid) {
      console.error('Invalid form data');
      return of(undefined);
    }

    const formData: FormData = new FormData();
    const studentform: StudentForm = form.value;

    Object.keys(studentform).forEach((key) => {
      // Use index signature to allow 'Image' as a property
      formData.append(key, (studentform as any)[key]);
    });

    formData.append('Image', imageFile);

    this.StudentForms.push(studentform);
    this.StudentFormsUpdated.next([...this.StudentForms]);

    console.log('this.StudentForms:', this.StudentForms);
    console.log('this.StudentFormsUpdated:', this.StudentFormsUpdated);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.apiUrl}/Students/form`, formData, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error adding student:', error);
        return throwError(error);
      })
    );
  }

  uploadImage(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.apiUrl}/upload-image`, formData, { headers });
  }

  getFormsUpdatedListener() {
    return this.StudentFormsUpdated.asObservable();
  }
}
