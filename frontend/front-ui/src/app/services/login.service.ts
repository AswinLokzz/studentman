import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class loginfromservice {
  private apiUrl = 'http://localhost:3000';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  loginAction(loginForm: FormGroup): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginForm.value);
  }
}
