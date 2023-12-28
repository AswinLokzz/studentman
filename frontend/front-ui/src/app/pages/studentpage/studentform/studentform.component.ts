import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForm} from "@angular/forms"
import { StudentFormService } from 'src/app/services/studentform.service';

@Component({
  selector: 'studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})
export class StudentformComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  mailID:string =''
  fileInput: any;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  hide = true;

 
  
  // selectedImage: File | null = null;
  // pickImage() {
  //   if (this.fileInput) {
  //     this.fileInput.nativeElement.click();
  //   }
  // }

  // onFileSelected(event: Event): void {
  //   const fileInput = (event.target as HTMLInputElement).files;
  
  //   if (fileInput && fileInput.files && fileInput.files.length > 0) {
  //     this.selectedImage = fileInput.files[0];
  //   } else {
  //     this.selectedImage = null;
  //   }
  // }

  // getSelectedImageName(): string {
  //   return this.selectedImage ? this.selectedImage.name : 'No image selected';
  // }
 
  constructor(public StudentService:StudentFormService){}

  newPost = 'This is a Post';  
    onAddStudent(form:NgForm){
      if(form.invalid){
        return;
      }
      {
        console.log("Form Value:",form.value)
        console.log("Email:",this.email.value)

        this.mailID = (this.email.value || '');

        this.StudentService.addStudent(form.value.Fullname,
          form.value.Gender,
          form.value.Year,
          form.value.Semester,
          form.value.District,
          form.value.Address,
          this.mailID,
          form.value.Username,
          form.value.Password).subscribe({
            next:data =>{
              console.log(data)
            }
          })
        }
        
        
      }
      
    }