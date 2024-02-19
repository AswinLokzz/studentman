import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { StudentFormService } from 'src/app/services/studentform.service';
import { timetableService } from 'src/app/services/timetable.service';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}



@Component({
  selector: 'app-studentsattendance',
  templateUrl: './studentsattendance.component.html',
  styleUrls: ['./studentsattendance.component.css']
})
export class StudentsattendanceComponent implements OnInit{

  id: string = '';
  details: any;
  attendance:any[]=[]
  oldattendance:any[]=[]
  studenttmetable: any[] = [];
  ntimetable: any[] = [];
  uniqueSemesters:any[]=[]
  sem:any[]=[]
  show:boolean=false

  constructor(private timetable: timetableService, private student:StudentFormService, private http:HttpClient){}

  ngOnInit(): void {
    this.id=localStorage.getItem('student_id') as string
    console.log(this.id)
    this.getData()
     
  }

  getData() {
  const data = {
    id: this.id
  };

  this.http.get(`http://localhost:3000/students/form/getData/${this.id}`)
    .subscribe({
      next: (res: any) => {
        this.details = res.data;
        this.oldattendance=res.att
        console.log("attendance" , this.oldattendance)
        console.log("the student details:",this.details);
        this.getsub(); // Call getsub() after receiving student data
      },
      error: (err: any) => {
        console.log('error', err.error.message);
      }
      
    });
}

getsub() {
  this.timetable.getTimetable().subscribe({
    next: (res: any) => {
      this.studenttmetable = res;
      console.log("The subjects", this.studenttmetable);
      this.gettingsubjects(); 
    },
    error: (err: any) => {
      console.log("Error Message",
       err);
    }
    
  });
  
}

clicked(i:any){
  
  console.log(i)
  this.show=true
  this.attendance= this.oldattendance.filter((item:any)=>{
    return item.Subject===i
  })
  console.log("updated",this.attendance)


}
gettingsubjects() {
  if (!this.details || !this.details.Semester) {
    console.error('Details or Semester property is not defined.');
    return;
  }

  for (let i of this.studenttmetable) {
    if (this.details.Semester == i.Semester) {
      this.ntimetable.push(i);
    }
  }
  console.log("the needed subjects:", this.ntimetable);
  if (this.ntimetable.length > 0) {
    let department = this.ntimetable[0];
    let subjects = department.Subjects;
    console.log("sub", subjects);
  }
}


  

}
