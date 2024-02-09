import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
  })
  export class timetableService {
    
    private apiUrl = 'http://localhost:3000';

    constructor(private http:HttpClient){}

    getTimetable() {
        return this.http.get('http://localhost:3000/timetable');
      }

      addSubject(tableform: FormGroup){
        return this.http.post(`${this.apiUrl}/subjectable`, tableform.value)
     
     }

  }