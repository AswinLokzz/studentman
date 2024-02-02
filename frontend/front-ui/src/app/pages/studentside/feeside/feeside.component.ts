import { Component, OnInit } from '@angular/core';
import { feeassigner } from 'src/app/services/feeassigner.service';

@Component({
  selector: 'app-feeside',
  templateUrl: './feeside.component.html',
  styleUrls: ['./feeside.component.css']
})
export class FeesideComponent implements OnInit{
  index=0;
  fee:any[]=[]

  public id :string = ''
  ngOnInit(): void {
    this.id = localStorage.getItem("student_id") as string
    this.feelistdue()
  }

  constructor(private feelist:feeassigner){}


  feelistdue(){
    this.feelist.getFeeData(this.id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.fee=res
  },
    error:($error:any)=>{
      console.log("--->",$error)
    }

})}

}
