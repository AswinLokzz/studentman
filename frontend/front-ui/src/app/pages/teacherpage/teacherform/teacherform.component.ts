import { Component, OnInit } from '@angular/core';
import { TeacherFormService } from 'src/app/services/teacherform.service';
import { teacherform } from 'src/app/models/teacherform.model';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-teacherform',
  templateUrl: './teacherform.component.html',
  styleUrls: ['./teacherform.component.css'],
  providers: [TeacherFormService], // Add the service to the component providers
})
export class TeacherformComponent implements OnInit {
  teacherform!: FormGroup;
  teacherforms!: teacherform;
  hide = true;
  semesterOptions: string[] = [];
  subjectOptions: string[] = [];

  selectedFile!: File | null;
  uploadProgress = 0;
  imagePreview: string | ArrayBuffer | null = null;
  id:any
  index=0;
  details:any
  teacherarr:any[]=[]
  constructor(private teacherFormService: TeacherFormService, private http:HttpClient, private toaster:ToastrService) {}

  ngOnInit(): void {
   
    this.teacherforms = {
      Fullname: '',
      Gender: '',
      Email: '',
      Semester: '',
      Year: '',
      subject: '',
      Department: '',
      Username: '',
      Password: '',
    };

    this.initForm();
    this.subscribeToYearChanges();
    this.subscribeToDepartmentChanges();
  }

  initForm(): void {
    this.teacherform = this.teacherFormService.initializeForm();
  }

  subscribeToYearChanges(): void {
    this.teacherform.get('Year')?.valueChanges.subscribe((year) => {
      this.semesterOptions = this.teacherFormService.getSemestersForYear(year);
      this.teacherform.get('Semester')?.setValue('');
      this.subjectOptions = this.teacherFormService.getSubjectsForDepartmentAndYear(
        this.teacherform.get('Department')?.value,
        year
      );
    });
  }

  subscribeToDepartmentChanges(): void {
    this.teacherform.get('Department')?.valueChanges.subscribe((department) => {
      const year = this.teacherform.get('Year')?.value;
      this.teacherform.get('Semester')?.setValue('');
      this.subjectOptions = this.teacherFormService.getSubjectsForDepartmentAndYear(
        department,
        year
      );
    });
  }

  getErrorMessage(): string {
    return this.teacherFormService.getErrorMessage();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log("selimage",this.selectedFile)
    this.updateImagePreview();
  }

  updateImagePreview(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUploadProgress(event: any): void {
    if (event.type === 'uploadProgress') {
      this.uploadProgress = Math.round((100 * event.loaded) / event.total);
    }
  }
 
  submitForm(): void {
    console.log(this.teacherform.value as teacherform);
    this.teacherform.value['image']=this.selectedFile?.name
    this.teacherform.value['allSubjects']=this.teacherarr
    this.teacherFormService.addTeacher(this.teacherform);
    this.teacherform.patchValue({
      Fullname: ' ',
      Gender: ' ',
      Email: ' ',
      Semester: '',
      Year: ' ',
      subject: ' ',
      Department: ' ',
      Username: ' ',
      Password: '',
      
    });
    this.selectedFile=null
    this.teacherarr.slice(0,this.teacherarr.length)
    this.toaster.success("Teacher Added Successfully")
    
  }

  onConfirm(){
    this.teacherarr.push({
      Year:this.teacherform.value.Year,
      Semester:this.teacherform.value.Semester,
      Subject:this.teacherform.value.subject,
    })
    console.log("--->",this.teacherarr)
    this.toaster.success("the subject has been added")
  }

}
