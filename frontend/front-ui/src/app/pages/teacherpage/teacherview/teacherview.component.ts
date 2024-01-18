import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';  // Import ActivatedRoute and Params
import { teacherform } from 'src/app/models/teacherform.model';

@Component({
  selector: 'app-teacherview',
  templateUrl: './teacherview.component.html',
  styleUrls: ['./teacherview.component.css']
})
export class TeacherviewComponent implements OnInit {
  id: any;
  details: any;
  teacherform!: teacherform;
  username: any;
  Fullname: any;
  Department: any;
  Year: any;
  Semester: any;
  Subject: any;
  Email: any;
  Password: any;
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

    this.http.post('http://localhost:3000/Teachers/form/getData', data)
      .subscribe({
        next: (res: any) => {
          this.details = res.data;
          console.log(this.details);

          this.username = this.details.Username;
          this.Fullname = this.details.Fullname;
          this.Department = this.details.Department;
          this.Year = this.details.Year;
          this.Semester = this.details.Semester;
          this.Subject = this.details.Subject;
          this.Email = this.details.Email;
          this.Password = this.details.Password;
          this.Image = this.details.Image;
        },
        error: (err: any) => {
          console.log('error', err.error.message);
        }
      });
  }

  isEditable:boolean=true;

  toggleEdit(){
    this.isEditable=!this.isEditable;

    const data={
      id:this.id,
      name:this.username,
      fname:this.Fullname,
      department:this.Department,
      year:this.Year,
      semester:this.Semester,
      subject: this.Subject,
      email:this.Email,
      password:this.Password,
      image:this.Image
    }
    this.http.post('http://localhost:3000/Teachers/form/update',data).subscribe({
      next: (res: any) => {console.log("update successfull")
    this.getData()},error:(err:any)=>{
        console.log(err)
  }})
  }
}
