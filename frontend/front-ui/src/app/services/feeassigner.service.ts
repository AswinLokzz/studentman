import { Injectable } from '@angular/core';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { FeeformComponent } from '../pages/fees/feeform/feeform.component';


@Injectable({
    providedIn: 'root',
  })
export class feeassigner{
    private apiUrl = 'http://localhost:3000';
    
    constructor(private http:HttpClient){}
    id!:string
    name!:string
   setId(id:string){
        this.id=id
        
    }

    getId(){
        return this.id
    
    }

    getFeeDueList(){
        return this.http.get('http://localhost:3000/Students/list');
    }

    addFee(feeForm:FormGroup){
        this.http.post(`${this.apiUrl}/fees/form`, feeForm.value)
    .subscribe({
        next:(res:any)=>{
            console.log(res)
        },error:(err:any)=>{
            console.log("error ", err)
        }
    })
    }

    getFeeData(){
        return this.http.get('http://localhost:3000/Fees/form');
    }

}

// addFee(FeeformComponent: FormGroup){
//     this.http.post(`${this.apiUrl}/Teachers/form`, feeForm.value)
//     .subscribe({
//         next:(res:any)=>{
//             console.log(res)
//         },error:(err:any)=>{
//             console.log("error ", err)
//         }
//     })
//   }

