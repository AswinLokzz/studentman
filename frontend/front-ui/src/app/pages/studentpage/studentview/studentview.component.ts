import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StudentForm } from 'src/app/models/studentform.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-studentview',
  templateUrl: './studentview.component.html',
  styleUrls: ['./studentview.component.css']
})

export class StudentviewComponent implements OnInit {
  id: any;
  details: any;
  studentform!: StudentForm;
  username: any;
  Fullname: any;
  Department: any;
  Year: any;
  Semester: any;
  Gender: any;
  Email: any;
  Password: any;
  District: any;
  Address:any
Image: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('_id');
      console.log('ID from route parameters:', this.id);
      this.getData();
    });
  }

  getData() {
    const data = {
      id: this.id
    };

    this.http.post('http://localhost:3000/students/form/getData', data)
      .subscribe({
        next: (res: any) => {
          this.details = res.data;
          console.log(this.details);
          console.log(this.details.Department)

          this.username = this.details.Username;
          this.Fullname = this.details.Fullname;
          this.Department = this.details.Department;
          this.Year = this.details.Year;
          this.Semester = this.details.Semester;
          this.Gender = this.details.Gender;
          this.Email = this.details.Email;
          this.Password = this.details.Password;
          this.District = this.details.District;
          this.Address = this.details.Address;
        },
        error: (err: any) => {
          console.log('error', err.error.message);
        }
      });
  }

  isEditable:boolean=true;

  toggleEdit(){
    this.isEditable=!this.isEditable;
    console.log(this.isEditable)

    const data={
      id:this.id,
      name:this.username,
      fname:this.Fullname,
      department:this.Department,
      year:this.Year,
      semester:this.Semester,
      gender: this.Gender,
      email:this.Email,
      password:this.Password,
      district:this.District,
      address:this.Address
    }
    this.http.post('http://localhost:3000/students/form/updateData', data)
  .subscribe({
    next: (res: any) => {
      
      // this.details = res.data;
      console.log(this.details);
      if(this.isEditable==true){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      }
     
      // Continue processing successful response
    },
    error: (err: any) => {
      console.error('Error:', err);
      // Handle the error, show a user-friendly message, or retry the request
    }
  });
  }
}



