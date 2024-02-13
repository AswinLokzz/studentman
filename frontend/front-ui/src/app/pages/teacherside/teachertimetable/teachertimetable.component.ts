import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClasssettingService } from 'src/app/services/classsetting.service';
import { timetableService } from 'src/app/services/timetable.service';

@Component({
  selector: 'app-teachertimetable',
  templateUrl: './teachertimetable.component.html',
  styleUrls: ['./teachertimetable.component.css']
})
export class TeachertimetableComponent implements OnInit{

  id!:string
  details:any
  studenttmetable: any[]=[];
  ntimetable: any[]=[];
  mon:any[]=[]
  tue:any[]=[]
  wed:any[]=[]



  constructor(public http:HttpClient,public classsetting: ClasssettingService, public timetable: timetableService){}


  ngOnInit(): void {

    this.id=localStorage.getItem('teacher_id') as string
    console.log("id:",this.id)
    this.getData()
    
  }


  getData() {
    const data = {
      id: this.id
    };

    this.http.post('http://localhost:3000/teachers/form/getData', data)
      .subscribe({
        next: (res: any) => {
          this.details = res.data;
          console.log("details:",this.details);
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
      if (this.details.Fullname == i.Teacher) {
        this.ntimetable.push(i);
      }
    }
    console.log("the needed subjects:", this.ntimetable);
    this.ntimetable.forEach((item: any) => {
      if (item.Day === 'Monday') {
        this.mon.push(item.Semester);
      } else if (item.Day === 'Tuesday') {
        this.tue.push(item.Semester);
      } else if (item.Day === 'Wednesday') {
        this.wed.push(item.Semester);
      }
    });
    this.tue.unshift(' ')
    this.wed.reverse()
    this.wed[2]=this.wed[1]
    this.wed[1]=' '
    console.log("Monday", this.mon);
    console.log("Tuesday", this.tue);
    console.log("Wednesday", this.wed);
  }


}
