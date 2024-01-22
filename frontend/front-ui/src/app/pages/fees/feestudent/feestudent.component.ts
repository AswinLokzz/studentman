import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentFormService } from 'src/app/services/studentform.service';
import { feedetails } from 'src/app/models/feestudent.model';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
export class FeestudentComponent implements OnInit, OnDestroy {

  students: feedetails[] = [];
  dataSource:MatTableDataSource<feedetails> = new MatTableDataSource()
  index=0;
  panelOpenState = false;
  

  constructor(private service: StudentFormService) {}

  ngOnInit(): void {
    this.service.getStudentForm().subscribe({
      next: (res: any) => {
        this.students = res.data;
        this.dataSource = new MatTableDataSource(this.students);
        console.log("got it", this.students);
      }
    });
  }

  displayedColumns: string[] = ['SNo', 'Name', 'Department', 'Year','Select'];
 

  ngOnDestroy(): void {
    // Clean up if needed
  }
}
