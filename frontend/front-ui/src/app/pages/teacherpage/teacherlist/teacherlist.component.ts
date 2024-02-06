import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherFormService } from 'src/app/services/teacherform.service';

@Component({
  selector: 'app-teacherlist',
  templateUrl: './teacherlist.component.html',
  styleUrls: ['./teacherlist.component.css']
})
export class TeacherlistComponent implements OnInit {

  teacher:any[]=[]
  show:boolean=true
  constructor(private Http: HttpClient, private service: TeacherFormService, private router:Router){}

  ngOnInit(): void {
    this.service.getTeacherForm().subscribe({
      next:(res:any)=>{
        this.teacher=res.data
        console.log("teacher",this.teacher)
      }
    })
  }

  // view(id:any){
  //   this.service.setshow()
  //   this.show=this.service.getshow()
  //   console.log(  this.show)
 
   
  //   this.service.setId(id)
  // }

  navigateToView(_id:any){
    console.log('Navigating to view with ID:', _id);
    this.router.navigate(['/admin/home/Teacher/view',_id])
  }
  
  

}
