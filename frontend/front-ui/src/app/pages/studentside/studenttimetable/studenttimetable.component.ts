import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClasssettingService } from 'src/app/services/classsetting.service';
import { timetableService } from 'src/app/services/timetable.service';// Corrected service name

@Component({
  selector: 'app-studenttimetable',
  templateUrl: './studenttimetable.component.html',
  styleUrls: ['./studenttimetable.component.css']
})
export class StudenttimetableComponent implements OnInit {
  id: string = '';
  details: any;
  studenttmetable: any[] = [];
  ntimetable: any[] = [];
  mon:any[]=[]
  tue:any[]=[]
  wed:any[]=[]

  constructor(public classsetting: ClasssettingService, public timetable: timetableService, private http: HttpClient) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('student_id') as string;
    console.log(this.id);
    this.getData();
  }

  getData() {
    const data = {
      id: this.id
    };

    this.http.post('http://localhost:3000/students/form/getData', data)
      .subscribe({
        next: (res: any) => {
          this.details = res.data;
          console.log(this.details);
          this.getsub(); // Call getsub() after receiving student data
        },
        error: (err: any) => {
          console.log('error', err.error.message);
        }
      });


  }

  getsub() {
    this.timetable.viewSubject().subscribe({
      next: (res: any) => {
        this.studenttmetable = res.data;
        console.log("The subjects", this.studenttmetable);
        this.gettingsubjects(); // Call gettingsubjects() after fetching timetable data
      },
      error: (err: any) => {
        console.log("Error Message", err);
      }
    });
  }

  gettingsubjects() {
    for (let i of this.studenttmetable) {
      if (this.details.Semester == i.Semester) {
        this.ntimetable.push(i);
      }
    }
    console.log("the needed subjects:", this.ntimetable);
    this.ntimetable.filter((item:any)=>{
      if(item.Day=='Monday'){
        this.mon.push(
          item.Subject)
      }
      else if(item.Day==='Tuesday'){
        this.tue.push(item.Subject)
      }
      else{
        this.wed.push(item.Subject)
      }
      console.log("monday",this.mon)

    })
  }
}
