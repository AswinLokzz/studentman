import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'studentsidebar',
  templateUrl: './studentsidebar.component.html',
  styleUrls: ['./studentsidebar.component.css']
})
export class StudentsidebarComponent {

  constructor(private router:Router){}

  navigateToStudentsList(){
    this.router.navigate(['admin/home/Students/list']);
  }

  navigateToAddStudent(){
    this.router.navigate(['admin/home/Students/form']);
  }

}
