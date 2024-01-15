import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentFormService } from 'src/app/services/studentform.service';

@Component({
  selector: 'studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})
export class StudentformComponent implements OnInit {
  studentForm!: FormGroup;
  hide = true;
  submitting = false;
  selectedFile!: File | null;
  uploadProgress = 0;
  imagePreview: string | ArrayBuffer | null = null;
  
  constructor(private fb: FormBuilder, public studentService: StudentFormService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      Fullname: ['', Validators.required],
      Gender: ['', Validators.required],
      Year: ['', Validators.required],
      Semester: ['', Validators.required],
      District: ['', Validators.required],
      Address: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });

  }

  getErrorMessage(): string {
    const emailControl = this.studentForm.get('Email')!;
    if (emailControl.hasError('required')) {
      return 'You must enter a value';
    }
    return emailControl.hasError('email') ? 'Not a valid email' : '';
  }
  

 



  onSubmit(): void {
    if (this.submitting || this.studentForm.invalid) {
      return;
    }

    this.submitting = true;

    this.studentService.addStudent(this.studentForm).subscribe({
      next: (data: any) => {
        console.log('Data from service:', data);
        console.log('Form Values:', this.studentForm.value);
        this.submitting = false;
      },
      error: (error) => {
        console.error('Error from service:', error);
        this.submitting = false;
      },
    });
  }


 

}