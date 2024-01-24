import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { feeassigner } from 'src/app/services/feeassigner.service';

@Component({
  selector: 'feeform',
  templateUrl: './feeform.component.html',
  styleUrls: ['./feeform.component.css']
})
export class FeeformComponent implements OnInit {
  feeForm!: FormGroup;
  feelist=[]

  constructor(private formBuilder: FormBuilder, public feeAssigner:feeassigner) {}

  ngOnInit() {
    this.feeForm = this.formBuilder.group({
      FeeType: ['', Validators.required],
      Amount: ['', Validators.required],
      Description: [''],
    });
    console.log(this.feeAssigner.getId())
   
  }

  onSubmit() {
    
  
    this.feeForm.value['id']=this.feeAssigner.getId()
    console.log(this.feeForm.value);

    this.feeAssigner.addFee(this.feeForm)

  }
}
