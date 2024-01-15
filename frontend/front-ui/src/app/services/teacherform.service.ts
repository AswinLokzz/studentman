import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherFormService {
  
  private apiUrl = 'http://localhost:3000';
  id:any
  show:boolean=true

  constructor(private fb: FormBuilder, private http:HttpClient) {}

  initializeForm(): FormGroup {
    return this.fb.group({
      Fullname: ['', Validators.required],
      Gender: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Semester: ['', Validators.required],
      Year: ['', Validators.required],
      subject: ['', Validators.required],
      Department: ['', Validators.required],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  getSemestersForYear(year: string): string[] {
    switch (year) {
      case 'First':
        return ['S1', 'S2'];
      case 'Second':
        return ['S3', 'S4'];
      case 'Third':
        return ['S5', 'S6'];
      case 'Fourth':
        return ['S7', 'S8'];
      default:
        return [];
    }
  }

  getSubjectsForDepartmentAndYear(department: string, year: string): string[] {
    switch (department) {
      case 'EEE':
        switch (year) {
          case 'First':
            return [
              'Electrical',
              'Advanced Electricals',
              'Highly Advanced Electrical',
            ];
          case 'Second':
            return ['Second EEE1', 'Second EEE2', 'Second EEE3'];
          case 'Third':
            return ['Third EEE1', 'Third EEE2', 'Third EEE3'];
          case 'Fourth':
            return ['Fourth EEE1', 'Fourth EEE2', 'Fourth EEE3'];
          default:
            return [];
        }
      case 'CS':
        switch (year) {
          case 'First':
            return ['CS1', 'CS2', 'CS3'];
          case 'Second':
            return ['Second CS1', 'Second CS2', 'Second CS3'];
          case 'Third':
            return ['Third CS1', 'Third CS2', 'Third CS3'];
          case 'Fourth':
            return ['Fourth CS1', 'Fourth CS2', 'Fourth CS3'];
          default:
            return [];
        }
      case 'ME':
        switch (year) {
          case 'First':
            return ['ME1', 'ME2', 'ME3'];
          case 'Second':
            return ['Second ME1', 'Second ME2', 'Second ME3'];
          case 'Third':
            return ['Third ME1', 'Third ME2', 'Third ME3'];
          case 'Fourth':
            return ['Fourth ME1', 'Fourth ME2', 'Fourth ME3'];
          default:
            return [];
        }
      case 'EC':
        switch (year) {
          case 'First':
            return ['EC1', 'EC2', 'EC3'];
          case 'Second':
            return ['Second EC1', 'Second EC2', 'Second EC3'];
          case 'Third':
            return ['Third EC1', 'Third EC2', 'Third EC3'];
          case 'Fourth':
            return ['Fourth EC1', 'Fourth EC2', 'Fourth EC3'];
          default:
            return [];
        }
      default:
        return [];
    }
  }

  addTeacher(teacherForm: FormGroup){
     this.http.post(`${this.apiUrl}/Teachers/form`, teacherForm.value)
    .subscribe({
        next:(res:any)=>{
            console.log(res)
        },error:(err:any)=>{
            console.log("error ", err)
        }
    })
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);
  
    const options = {
      reportProgress: true,
      observe: 'events' as 'events',
      headers: new HttpHeaders({
        // Add any headers needed for your API
      }),
    };
  
    return this.http.post(`${this.apiUrl}/upload-image`, formData, options);
  }

  getErrorMessage(): string {
    return 'Invalid input';
  }

  getTeacherForm() {
    return this.http.get('http://localhost:3000/Teachers/list');
  }

  setId(id:any){
    this.id=id
  }

  getId(){
    return this.id
  }

  // setshow(){
  //   this.show=!this.show
  // }

  // getshow(){
  //   return this.show
  // }

  // getFormsUpdatedListener() {
  //   return this.StudentFormsUpdated.asObservable();
  // }

}
