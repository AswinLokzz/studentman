import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginfromservice } from 'src/app/services/login.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  submitting=false

  loginform!: FormGroup;

  constructor(private fb:FormBuilder, public service:loginfromservice, private router:Router){}

  ngOnInit(): void {
    this.initform();
    
  }

  initform():void{
    this.loginform= this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    })
   

  }

  
  onSubmit() {
    if (this.submitting || this.loginform.invalid) {
      return;
    }
    this.submitting = true;
    console.log("form", this.loginform);
    this.service.loginAction(this.loginform).subscribe({
      next: (data: any) => {
        console.log('Data from service:', data);
        console.log('Form Values:', this.loginform.value);
        this.submitting = false;
        this.router.navigate(['/home'])
        
      },
      error: (error) => {
        console.error('Error from service:', error);
        this.submitting = false;
      },
    });
  }

}
