// studentlist.component.ts
import { Component, Input, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { StudentForm } from 'src/app/models/studentform.model';
import { StudentFormService } from 'src/app/services/studentform.service';
import { Subscription,Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit,OnDestroy{
  [x: string]: any;
  dataSource = new MatTableDataSource<any>([]);
    // students:StudentForm[]=[
    //   {Fullname:"Aswin",Gender:"Male",Year:"Fourth",Semester:"S8",District:"Thrissur",Address:"Thaiparambil House",Email:"aswintsugathan@gmail",Username:"Aswi@2000",Password:"Aswi@2000"},
    //   {Fullname:"Aswiny",Gender:"Female",Year:"Third",Semester:"S6",District:"Ernakulam",Address:"Thaiparambil House, Thrissur, valapad",Email:"aswint@gmail",Username:"Aswi@2001",Password:"Aswi@2001"},
    //   {Fullname:"Aswin T Sugathan",Gender:"Male",Year:"Fourth",Semester:"S7",District:"Kollam",Address:"Thaiparambil House, valapad",Email:"aswintsugathgmail",Username:"Aswi@2002",Password:"Aswi@2002"}
    // ]

  displayedColumns: string[] = ['regNo', 'name', 'semester', 'year', 'view'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  viewStudent(student: StudentForm): void {
    // Implement logic to handle the "View" button click
    console.log('View clicked for:', student);
  }

  // StudentService: StudentFormService = new StudentFormService;

  constructor(private StudentService:StudentFormService, private router:Router, ){
   
  }

  StudentContentData: StudentForm[]=[];

  students:StudentForm[]=[]
  studentlist:any[] = []
  private StudentFormSub: Subscription = new Subscription;

  ngOnInit(): void {
    this.StudentService.getStudentForm().subscribe({
      next:(data:any)=>{
        this.studentlist = data.data
        console.log(this.studentlist)
      }
    })
    this.StudentFormSub=this.StudentService.getFormsUpdatedListener().subscribe((StudentContentData:StudentForm[])=>{
      this.StudentContentData=StudentContentData
      this.dataSource.data = this.studentlist;
    })
  }

  ngOnDestroy(): void {
    this.StudentFormSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  navigateToView(_id:any){
    console.log('Navigating to view with ID:', _id);
    this.router.navigate(['/admin/home/Students/view',_id])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

