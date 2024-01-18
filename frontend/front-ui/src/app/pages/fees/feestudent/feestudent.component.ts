import { Component, Input, OnInit,OnDestroy } from '@angular/core';
import { StudentForm } from 'src/app/models/studentform.model';
import { StudentFormService } from 'src/app/services/studentform.service';
import { Subscription,Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'feestudent',
  templateUrl: './feestudent.component.html',
  styleUrls: ['./feestudent.component.css']
})
export class FeestudentComponent implements OnInit,OnDestroy {
  
  student:any[]=[]

  constructor(private service:StudentFormService){}

  ngOnInit(): void {
    this.service.getStudentForm().subscribe({
      next:(res:any)=>{
        this.student=res.data
        console.log("got it",this.student)
      }
    })
    
  }

  ngOnDestroy(): void {
    
  }

  
}
