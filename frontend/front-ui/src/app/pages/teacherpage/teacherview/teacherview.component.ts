import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';  // Import ActivatedRoute and Params

@Component({
  selector: 'app-teacherview',
  templateUrl: './teacherview.component.html',
  styleUrls: ['./teacherview.component.css']
})
export class TeacherviewComponent implements OnInit {
  id: any;
  details: any;
  username!: string;
  Fullname!: string;
  Department!: string;
  Year!: string;
  Semester!: string;
  Email!: string;
  Password!: string;
  Subject!: string;
  Image!: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['_id'];
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
}
