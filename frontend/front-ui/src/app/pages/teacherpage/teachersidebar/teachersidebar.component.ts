import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherFormService } from 'src/app/services/teacherform.service';

@Component({
  selector: 'teachersidebar',
  templateUrl: './teachersidebar.component.html',
  styleUrls: ['./teachersidebar.component.css']
})
export class TeachersidebarComponent {

  constructor(private router:Router, private service:TeacherFormService){}

  navigateToTeachersList(){
    this.router.navigate(['/Teachers/list']);
    this.service.setshow()
    console.log(this.service.getshow())
  }

  navigateToAddTeacher(){
    this.router.navigate(['/Teachers/form']);
  }

}
