import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentFormService } from 'src/app/services/studentform.service';
import { feedetails } from 'src/app/models/feestudent.model';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FeeformComponent } from '../feeform/feeform.component';
import { MatDialog } from '@angular/material/dialog';
import { feeassigner } from 'src/app/services/feeassigner.service';

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
export class FeestudentComponent implements OnInit{

  students: feedetails[] = [];
  dataSource:MatTableDataSource<feedetails> = new MatTableDataSource()
  index=0;
  panelOpenState = false;
  columnsToDisplay = ['SNo','Fullname', 'Department', 'Year'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandendData!:feedetails|null
  

  constructor(private service: StudentFormService, private dialog:MatDialog, private feeAssigner:feeassigner) {}
  ;
  ngOnInit(): void {
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


  toggleExpand(element: any): void {
    this.expandendData = this.expandendData === element ? null : element;
  }

  popUp(id:any){
    this.feeAssigner.setId(id)
    const dialogRef = this.dialog.open(FeeformComponent, {
      width: '400px', // Set the width of your popup
      data: { /* You can pass data to your popup component if needed */ }
    });
  
    // Handle the result from the popup if necessary
    dialogRef.afterClosed().subscribe(result => {
      console.log('The popup was closed with result:', result);
    });
  }
  

}
