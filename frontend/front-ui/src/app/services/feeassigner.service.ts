import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
  })
export class feeassigner{
    private apiUrl = 'http://localhost:3000';
    
    constructor(private http:HttpClient){}


    getFeeDueList(){
        return this.http.get('http://localhost:3000/Students/list');
    }
}