import { Component, OnInit, OnDestroy, DoCheck, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { StudentFormService } from 'src/app/services/studentform.service';
import { feedetails } from 'src/app/models/feestudent.model';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FeeformComponent } from '../feeform/feeform.component';
import { MatDialog } from '@angular/material/dialog';
import { feeassigner } from 'src/app/services/feeassigner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'feestudent',
  templateUrl: './feestudent.component.html',
  styleUrls: ['./feestudent.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FeestudentComponent implements OnInit {

  students: feedetails[] = [];
  dataSource:MatTableDataSource<feedetails> = new MatTableDataSource()
  index=0;
  panelOpenState = false;
  columnsToDisplay = ['SNo','Fullname', 'Department', 'Year'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandendData!:feedetails|null
  feelist:any[]=[]
  id:any[]=[]
  idnew!:string
  show:any[]=[]
  private feeAssignerSubscription!: Subscription;
  constructor(private service: StudentFormService, private dialog:MatDialog, private feeAssigner:feeassigner, private cdref: ChangeDetectorRef) {}
  ;
  ngOnInit(): void {
    this.feeAssignerSubscription = this.feeAssigner.onSubmit$.subscribe(() => {
      this.updateStudentList();
    });

    this.toggleExpand();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getStudentList()
  }

  updateStudentList() {
    this.getStudentList();
    // Manually trigger change detection
    this.cdref.detectChanges();
  }

  getStudentList(){
    this.service.getStudentForm().subscribe({
      next: (res: any) => {
        // Assign serial numbers to each student
        this.students = res.data.map((student: feedetails, index: number) => {
          student.SNo = index + 1;
          return student;
        });

        this.dataSource = new MatTableDataSource(this.students);
        console.log('got it', this.students);

      },
      
    });
  }

   passing(id:any){
    console.log("it works")
    this.idnew=id
    console.log(this.id)
    if(!this.id.includes(this.idnew)){
      this.show.push(this.idnew)
    }
   }

   


  toggleExpand() {
    // this.expandendData = this.expandendData === element ? null : element;
    this.feeAssigner.getFeeData().subscribe({
      next:(res:any)=>{
        this.feelist=res
        this.feelist.forEach((item:any)=>{
           this.id.push(item.studentid)
        })
        this.getStudentList()

     
        console.log("feelist",this.feelist)
      }
    })
  }

 
  
  
  popUp(id:any){
    this.feeAssigner.setId(id)
    const dialogRef = this.dialog.open(FeeformComponent, {
      width: '400px', // Set the width of your popup
      disableClose:true,
      data: { /* You can pass data to your popup component if needed */ }
    });
  
    // Handle the result from the popup if necessary
    dialogRef.afterClosed().subscribe(result => {
      this.feeAssigner.getFeeData().subscribe({
        next:(res:any)=>{
          this.feelist=res
          this.feelist.forEach((item:any)=>{
             this.id.push(item.studentid)
          })
          this.getStudentList()
  
       
          console.log("feelist",this.feelist)
        }
      })
    });
  }
  

}
