import { StudentForm } from "../models/studentform.model";
import { Injectable } from "@angular/core";
import { Subject, map } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { homeContentModel } from '../models/homeContent.model';


@Injectable({providedIn: 'root'})
export class StudentFormService{

    private apiUrl = 'http://localhost:3000';
    private StudentForms:StudentForm[]=[];
    private StudentFormsUpdated=new Subject<StudentForm[]>()

    constructor(private http: HttpClient) {}

    getStudentForm(){
        return this.http.get('http://localhost:3000/Students/list')
    }

    addStudent(Fullname:string,Gender:string,Year:string,Semester:string,District:string,Address:string,Email:string,Username:string,Password:string){
        console.log("District:",District)
        const studentform:StudentForm={Fullname:Fullname,Gender:Gender,Year:Year,Semester:Semester,District:District,Address:Address,Email:Email,Username:Username,Password:Password};
        
        this.StudentForms.push(studentform);
        this.StudentFormsUpdated.next([...this.StudentForms])
        console.log("this.StudentForms:",this.StudentForms)
        console.log("this.StudentFormsUpdated:",this.StudentFormsUpdated)

        return this.http.post(`${this.apiUrl}/Students/form`,studentform)
    }

    getFormsUpdatedListener(){
        return this.StudentFormsUpdated.asObservable();
    }
}