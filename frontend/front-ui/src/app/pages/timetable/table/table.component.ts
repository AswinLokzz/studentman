import { Component, DoCheck, OnInit } from '@angular/core';
import { TeacherFormService } from 'src/app/services/teacherform.service';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { timetableService } from 'src/app/services/timetable.service';
import { ToastrService } from 'ngx-toastr';




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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  teachers:any[]=[]
  finalsub:any[]=[]
  show!:boolean
  shown!:boolean

  subjects:any[]=[]
  availableteachers:any[]=[]
  filterbyDepartment:any[]=[]
  filterbySemester:any[]=[]
  text!:string
  tableform!:FormGroup
  filteredTeachers: any[] = [];
  newfilteredTeachers: any[] = [];

  newtimetable:any[]=[]


  constructor(private teacherlist:TeacherFormService, private fb:FormBuilder, private subjectlist:timetableService, private toaster:ToastrService){}



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

  getSubjectdetails(){
    this.subjectlist.viewSubject().subscribe({
      next:(res:any)=>{
        this.newtimetable=res.data
        console.log(this.newtimetable)
      
      },
      error:(err:any)=>{
        console.log("Error Message",err)
      }
    })
  }

  getSubjects() {
    this.subjectlist.getTimetable().subscribe({
      next: (res: any) => {
        this.subjects = res;
        console.log("The subjects", this.subjects);
        // this.subjects.forEach((element) => {
        //   console.log(element.Subjects);
        //   element.Subjects.forEach((item: { Subjects: any; }) => {
        //     console.log(item.Subjects);
        //   });
        // });
      },
      error: (err: any) => {
        console.log("Error Message", err);
      }
    });
  }

  filterTeachersByDepartment(department: string) {
    this.filteredTeachers = [];
    this.filterbyDepartment=[]
    console.log("department",department) // Clear the filtered teachers array before filtering again
    for (let teacher of this.teachers) {
      console.log("teacher",teacher)
      if (teacher.Department ===department) {
        this.filteredTeachers.push(teacher);
      }

    }
    for(let subject of this.subjects){
      console.log("subject",subject)
      if(subject.Department==department){
        this.filterbyDepartment.push(subject);
        console.log("the needed ones:",this.filterbyDepartment)
      }
    }

  }

  filteredsubjectsbysemester(semester:string){
    this.filterbySemester=[]
    console.log("semester",semester)
    for(let sub of this.filterbyDepartment){
      console.log("sub",sub)
      if(sub.Semester==semester){
      this.filterbySemester.push(sub);
      console.log("the finally pushed",this.filterbySemester)
      }
    }
    this.filterbySemester.forEach((element) => {
      console.log(element.Subjects);
      element.Subjects.forEach((item: { Subjects: any; }) => {

        this.finalsub=element.Subjects
        console.log("finished:",this.finalsub)

      });
    });
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
    {value: '1', viewValue: 'S3'},
    {value: '2', viewValue: 'S5'},
    {value: '3', viewValue: 'S7'},
  ];
  // Subjects: subject[] = [
  //   {value: '0', viewValue: 'CS1'},
  //   {value: '1', viewValue: 'CS2'},
  //   {value: '2', viewValue: 'CS3'},
  // ];
  // Subjects: subject[] = [
  //   {value: '0', viewValue: 'CS1'},
  //   {value: '1', viewValue: 'CS2'},
  //   {value: '2', viewValue: 'CS3'},
  // ];

  ngOnInit(): void {
    this.initform()
    this.getSubjects()
    this.getTeachers()
    this.getSubjectdetails()
    this.filterTeachersByDepartment
    this.filteredsubjectsbysemester
    this.show=true
    this.shown=true

  }

  initform(){
   this.tableform= this.fb.group({
    Day:['',Validators.required],
    Hour:['',Validators.required],
    Department:['',Validators.required],
    Semester:['',Validators.required],
    Subject:['',Validators.required],
    Teacher: ['', Validators.required]
   })
  }



  submitting = false;

  onSubmit():void {
    console.log("newtimetabvle" , this.newtimetable)
    console.log("table", this.tableform.value)
   
    this.newtimetable = this.newtimetable.filter((item) => {
      if (
        (item.Teacher === this.tableform.value.Teacher &&
        item.Department === this.tableform.value.Department &&
        item.Day === this.tableform.value.Day &&
        item.Hour === this.tableform.value.Hour) 
      ) {
        this.text = 'Teacher has already been assigned to this hour';
        this.show = false;
         
      }
 
    });
    
    this.newtimetable = this.newtimetable.filter((item: any) => {
      if (
        this.tableform.value.Fullname === item.Fullname &&
        this.tableform.value.Day === item.Day &&
        this.tableform.value.Hour === item.Hour
      ) {
        this.text = 'Teacher has already been assigned to this hour';
        this.shown = false;
      }

    });
    
    // this.newtimetable = this.newtimetable.filter((item) => {
    //   if (
    //     this.tableform.value.Fullname === item.Fullname &&
    //     this.tableform.value.Subject === item.Subject
    //   ) {
    //     this.text = 'Teacher has already been assigned to this hour';
    //     this.show = false;
    //     return false; 
    //   }
    //   return true; 
    // });
    
    if (this.show === false) {
      this.toaster.error(this.text);
      this.show=true
      return;
    }
    if (this.shown === false) {
      this.toaster.error(this.text);
      this.show=true
      return;
    }


 
    if (this.submitting || this.tableform.invalid) {
      return;
    }
    
    this.submitting = true;
    console.log("form", this.tableform)
    this.subjectlist.addSubject(this.tableform).subscribe({
      next: (data: any) => {
        console.log('Data from service:', data);
        console.log('Form Values:', this.tableform.value);
        this.submitting = false;
        this.show=true
        this.shown=true
        this.toaster.success("the subject has been added")
        this.getSubjectdetails()
      },
      error: (error: any) => {
        console.error('Error from service:', error);
        this.submitting = false;
      },
    });
  }
    
}

