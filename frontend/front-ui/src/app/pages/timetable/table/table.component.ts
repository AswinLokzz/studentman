import { Component, DoCheck, OnInit } from '@angular/core';
import { TeacherFormService } from 'src/app/services/teacherform.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';



interface day {
  value: string;
  viewValue: string;
}

interface hour{
  value: string;
  viewValue: string;
}

interface department{
  value: string;
  viewValue: string;
}
interface semester{
  value: string;
  viewValue: string;
}

interface subject{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  teachers:any[]=[]
  tableform!:FormGroup

  constructor(private teacherlist:TeacherFormService, private fb:FormBuilder){}

 

  getTeachers(){
    this.teacherlist.getTeacherForm().subscribe({
      next:(res:any)=>{
        this.teachers=res.data

      },
      error:(err:any)=>{
        console.log("Error Message",err)
      }
    })
  }

  Days: day[] = [
    {value: '0', viewValue: 'Monday'},
    {value: '1', viewValue: 'Tuesday'},
    {value: '2', viewValue: 'Wednesday'},
  ];
  Hours: hour[] = [
    {value: '0', viewValue: 'I '},
    {value: '1', viewValue: 'II'},
    {value: '2', viewValue: 'III'},
  ];
  Departments: department[] = [
    {value: '0', viewValue: 'CS'},
    {value: '1', viewValue: 'EEE'},
    {value: '2', viewValue: 'ME'},
    {value: '3', viewValue: 'EC'},
  ];
  Semesters: semester[] = [
    {value: '0', viewValue: 'S1'},
    {value: '1', viewValue: 'S2'},
    {value: '2', viewValue: 'S3'},
    {value: '3', viewValue: 'S4'},
  ];
  Subjects: subject[] = [
    {value: '0', viewValue: 'CS1'},
    {value: '1', viewValue: 'CS2'},
    {value: '2', viewValue: 'CS3'},
  ];
  // Subjects: subject[] = [
  //   {value: '0', viewValue: 'CS1'},
  //   {value: '1', viewValue: 'CS2'},
  //   {value: '2', viewValue: 'CS3'},
  // ];

  ngOnInit(): void {
    this.initform()
  }

  initform(){
   this.tableform= this.fb.group({
    Day:['',Validators.required],
    Hour:['',Validators.required],
    Department:['',Validators.required],
    Semester:['',Validators.required],
    Subject:['',Validators.required],
   })
  }

  apple(){
    console.log("---->",this.tableform)
    this.getTeachers()
    console.log("teachers",this.teachers)
  }

}
