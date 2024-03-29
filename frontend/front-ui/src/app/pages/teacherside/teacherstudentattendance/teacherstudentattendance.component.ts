import { Component, OnInit, ViewChild, AfterViewInit, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentFormService } from 'src/app/services/studentform.service';
import { timetableService } from 'src/app/services/timetable.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

declare var $: any;
@Component({
  selector: 'app-teacherstudentattendance',
  templateUrl: './teacherstudentattendance.component.html',
  styleUrls: ['./teacherstudentattendance.component.css'],
  
})
export class TeacherstudentattendanceComponent implements OnInit, AfterViewInit {
  id: string = '';
  index=1
  studentList: any[] = [];
  details: any;
  subject!:string
  sems: any[] = [];
  studenttmetable: any[] = [];
  ntimetable: any[] = [];
  teachersem: any[] = [];
  uniqueSemesters:any[]=[]
  sem:any[]=[]
  new:any[]=[]
  deptstudents: any[] = [];
  displayedStudents: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['select', 'SNO', 'Fullname', 'Semester'];
  selection = new SelectionModel<any>(true, []);
  hour!:string
  hours:any[]=[]
  selected = 'Select a Hour';
  $: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  date:any
  semester:any

  constructor(private studentlist: StudentFormService, public http: HttpClient, private timetable: timetableService) {

   }

  ngOnInit(): void {
    this.id = localStorage.getItem("teacher_id") as string;
    console.log("the teacher Id:", this.id);
    this.getstudents();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getstudents() {
    this.studentlist.getStudentForm().subscribe({
      next: (res: any) => {
        this.studentList = res.data;
        console.log("studentslist:", this.studentList);
        this.getData();
      }
    });
  }

  getData() {
    const data = { id: this.id };

    this.http.post('http://localhost:3000/teachers/form/getData', data)
      .subscribe({
        next: (res: any) => {
          this.details = res.data;
          console.log("details:", this.details);
          this.neededstudents();
          this.getsub();
        },
        error: (err: any) => {
          console.log('error', err.error.message);
        }
      });
  }

  neededstudents() {
    for (let i of this.studentList) {
      if (this.details.Department == i.Department) {
        this.deptstudents.push(i);
      }
    }
    console.log("the departmentstudents:", this.deptstudents);
  }

  changeDate(){
    const selectedDate = new Date(this.date);
    const dayOfWeek = selectedDate.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekString = daysOfWeek[dayOfWeek];
    console.log(dayOfWeekString);
    this.ntimetable.filter((item:any)=>{
     

       if((item.Semester===this.semester) && (item.Day==dayOfWeekString)){
          this.hours.push(item.Hour)
       }
    })
    console.log('hours', this.hours)

  }

   add(){


    console.log(this.selection.selected)
    this.selection.selected.forEach((item:any)=>{
      if(!this.new.includes(item._id)){
      this.new.push(item._id)
      }
    })
    const data={
      id:localStorage.getItem('teacher_id'),
      students:this.new,
      date:this.date,
      sub:this.subject,
      hr:this.hour
    }
    this.http.post('http://localhost:3000/attendance/add', data)
    .subscribe({
      next:(res:any)=>{
        console.log(res)
      }, error:(err:any)=>{
        console.log(err)
      }
    })
   }
  getsub() {
    this.timetable.viewSubject().subscribe({
      next: (res: any) => {
        this.studenttmetable = res.data;
        console.log("The subjects", this.studenttmetable);
        this.gettingsubjects();
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
      this.uniqueSemesters.push({Sem:item.Semester, Subject:item.Subject});
    });
     
    this.sem = this.uniqueSemesters.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          (t) => t.Subject === thing.Subject && t.Sem === thing.Sem
        )
    );
    // this.teachersem = Array.from(this.uniqueSemesters);

    console.log("the semesters that the teacher is taking", this.sem);
  }

  getValue(item: any) {
    this.subject= item.Subject
    this.semester=item.Sem
    this.displayedStudents = [];
    console.log("selected options:", item);
    for (let x of this.deptstudents) {
      if (item.Sem == x.Semester) {
        this.displayedStudents.push(x);
      }
    }

    console.log("final students:", this.displayedStudents);
    this.dataSource = new MatTableDataSource<any>(this.displayedStudents);
    this.selection.clear();
    this.displayedStudents.forEach(student => this.selection.select(student));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onSelectionChange(){
    this.hour=this.selected
    console.log(this.hour)
  }
}
