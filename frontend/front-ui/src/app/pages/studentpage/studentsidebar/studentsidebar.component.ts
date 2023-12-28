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
    this.router.navigate(['/Students/list']);
  }

  navigateToAddStudent(){
    this.router.navigate(['/Students/form']);
  }

}
