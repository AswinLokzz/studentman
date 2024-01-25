import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { feeassigner } from 'src/app/services/feeassigner.service';
import { FeestudentComponent } from '../feestudent/feestudent.component';

@Component({
  selector: 'feeform',
  templateUrl: './feeform.component.html',
  styleUrls: ['./feeform.component.css']
})
export class FeeformComponent implements OnInit, OnDestroy{
  feeForm!: FormGroup;
  feelist=[]

  constructor(private formBuilder: FormBuilder, public feeAssigner:feeassigner,
    public dialogRef: MatDialogRef<FeestudentComponent>) {}

  ngOnInit() {
    this.feeForm = this.formBuilder.group({
      FeeType: ['', Validators.required],
      Amount: ['', Validators.required],
      Description: [''],
    });
    console.log(this.feeAssigner.getId())
   
  }

  ngOnDestroy(): void {
    
  }

  onSubmit() {
    
  
    this.feeForm.value['id']=this.feeAssigner.getId()
    console.log(this.feeForm.value);

    this.feeAssigner.addFee(this.feeForm)
    this.dialogRef.close()

    

  }


}
