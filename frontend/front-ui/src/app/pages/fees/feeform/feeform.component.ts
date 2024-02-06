import { Component, DoCheck, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { feeassigner } from 'src/app/services/feeassigner.service';
import { FeestudentComponent } from '../feestudent/feestudent.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'feeform',
  templateUrl: './feeform.component.html',
  styleUrls: ['./feeform.component.css']
})
export class FeeformComponent implements OnInit, OnDestroy{
  feeForm!: FormGroup;
  feelist=[]

  constructor(private formBuilder: FormBuilder, public feeAssigner:feeassigner,
    public dialogRef: MatDialogRef<FeestudentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.feeForm = this.formBuilder.group({
      FeeType: ['', Validators.required],
      Amount: ['', Validators.required],
      Description: [''],
      Status:['Unpaid',Validators.required]
    });
    console.log("data received:", this.data)

   
  }

  ngOnDestroy(): void {
    
  }

  onSubmit() {
    for(let item of this.data.id){

      this.feeForm.value['id']=item
      console.log(this.feeForm.value);
  
      this.feeAssigner.addFee(this.feeForm)
    }
  




    this.dialogRef.close()

    

  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog
  }


}
