// src/app/pages/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { homeContentModel } from 'src/app/models/homeContent.model';
import { HomeContentService } from 'src/app/services/homeContent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public contentData: homeContentModel[] = [];
  private Locationdata = window.location.pathname
  public studentFlag:boolean = false
  public teacherFlag:boolean = false
  public adminFlag:boolean = false
  public studentItems= ['Fees','Timetable','Subjects']
  public teacherItems= ['Students','Timetable']
  public adminItems=['Students','Teachers','Fees','Timetable']
  constructor(private contentService: HomeContentService, private router: Router) {}

  ngOnInit(): void {
    
     this.studentFlag = false
     this.teacherFlag = false
     this.adminFlag = false
    console.log("Location: ",this.Locationdata)
    if(this.Locationdata === "/Teachers/home"){
      this.teacherFlag = true
      // console.log("I am here")
    }
    else if(this.Locationdata === "/Students/home"){
      this.studentFlag = true
    }
    else if(this.Locationdata === "/admin/home"){
      this.adminFlag = true
    }
    this.contentService.getContentData().subscribe({
      next: (data: homeContentModel[]) => {
        this.contentData = data;
      },
      error: (error) => {
        console.error('Error fetching content data:', error);
      },
    });
  }

  navigateToPage(pageName: string) {
    switch (pageName) {
      case 'Students':
        this.router.navigate(['/admin/home/Students']);
        break;
      case 'Teachers':
        this.router.navigate(['/admin/home/Teachers']);
        break;
      case 'Fees':
        this.router.navigate(['/admin/home/Fees'])
        break;
      case 'Timetable':
        this.router.navigate(['/admin/home/Timetables'])
        break;
      case 'Subjects':
        this.router.navigate(['/admin/home/Subjects'])
        break;
      // Add more cases for other pages if needed
      default:
        // Handle default case or do nothing
        break;
    }
  }

  navigateToTeacherPage(pageName: string) {
    switch (pageName) {
      case 'Students':
        this.router.navigate(['Teachers/students']);
        break;
      case 'Timetable':
        this.router.navigate(['Teachers/timetable'])
        break;
      // Add more cases for other pages if needed
      default:
        // Handle default case or do nothing
        break;
    }
  }


  navigateToStudentPage(pageName: string) {
    switch (pageName) {
      case 'Fees':
        this.router.navigate(['Students/Fees'])
        break;
      case 'Timetable':
        this.router.navigate(['Students/timetable'])
        break;
      case 'Subjects':
        this.router.navigate(['Students/Subjects'])
        break;
      // Add more cases for other pages if needed
      default:
        // Handle default case or do nothing
        break;
    }
  }
}
