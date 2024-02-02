import { Component, OnInit, OnDestroy, DoCheck, ChangeDetectorRef, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { StudentFormService } from 'src/app/services/studentform.service';
import { feedetails } from 'src/app/models/feestudent.model';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FeeformComponent } from '../feeform/feeform.component';
import { MatDialog } from '@angular/material/dialog';
import { feeassigner } from 'src/app/services/feeassigner.service';
import { Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
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
  columnsToDisplaywithoutselect = ['SNo','Fullname', 'Department', 'Year'];
  columnsToDisplay = ['select','SNo','Fullname', 'Department', 'Year'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandendData!:feedetails|null
  filtereddata:feedetails[] = []
  feelist:any[]=[]
  totalposts = 10;  
  id:any[]=[]
  idnew!:string
  show:any[]=[]
  arr:string[]=[]
  private feeAssignerSubscription!: Subscription;
  selection = new SelectionModel<feedetails>(true, []); // Main rows selection model
  selectionDetails = new SelectionModel<feedetails>(true, []); // Details rows selection model
  @ViewChild(MatPaginator)  paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort;
  constructor(private service: StudentFormService, private dialog:MatDialog,
     private feeAssigner:feeassigner, private cdref: ChangeDetectorRef) {}
  ;
  ngOnInit(): void {
    // this.feeAssignerSubscription = this.feeAssigner.onSubmit$.subscribe(() => {
    //   this.updateStudentList();


    // });
    this.getStudentList();
    this.toggleExpand();
    this.cdref.detectChanges()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  

  // ngAfterViewInit() {

    
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.getStudentList()
  // }

  // updateStudentList() {
  //   this.getStudentList();
  //   // Manually trigger change detection
  //   // this.cdref.detectChanges();
  // }

  getStudentList(){
    this.service.getStudentForm().subscribe({
      next: (res: any) => {
        // Assign serial numbers to each student
        this.students = res.data.map((student: feedetails, index: number) => {
          student.SNo = index + 1;
          return student;
        });

        this.dataSource.data = this.students;
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
    this.feeAssigner.getFeeData('null').subscribe({
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
    this.arr=[]
    this.feeAssigner.setId(id)
    this.arr.push(id)
    const dialogRef = this.dialog.open(FeeformComponent, {
      width: '400px', // Set the width of your popup
      disableClose:true,
      data: { id:this.arr }
    });
  
    // Handle the result from the popup if necessary
    dialogRef.afterClosed().subscribe(result => {
      this.feeAssigner.getFeeData('null').subscribe({
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

  isAssignToAllActive(): boolean {
    return this.selection.selected.length > 1;
  }

  isAllSelected(): boolean  {
    const numSelected = this.selection.selected.length;
    const numRows = this.filtereddata.length;
    return numSelected === numRows;
  }

  // Selects all main rows if they are not all selected; otherwise clear selection
  toggleAllRows() {

    this.filtereddata = this.dataSource.filteredData;
    if (this.isAllSelected()) {
      this.selection.clear();
 
    } else {
      // Otherwise, select all currently displayed rows
      this.selection.select(...this.filtereddata);
    }
    
    
    // this.selection.select(...this.dataSource.data);
    // console.log('selection :',this.selection)
    
  }
  
  // The label for the checkbox on the passed main row
  checkboxLabel(row?: feedetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // console.log('selection row:',this.selection)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.SNo}`;
  }

  // Whether the number of selected elements matches the total number of details rows
  isAllDetailsSelected() {
    const numSelected = this.selectionDetails.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all details rows if they are not all selected; otherwise clear selection
  toggleAllDetails() {
    if (this.isAllDetailsSelected()) {
      this.selectionDetails.clear();
      return;
    }

    this.selectionDetails.select(...this.dataSource.data);
    console.log("selection details:", this.selectionDetails)
  }

  // The label for the checkbox on the passed details row
  checkboxLabelDetails(row?: feedetails): string {
    if (!row) {
      return `${this.isAllDetailsSelected() ? 'deselect' : 'select'} all details`;
    }
    return `${this.selectionDetails.isSelected(row) ? 'deselect' : 'select'} details row ${row.SNo}`;
  }

  // Reset details selection when expanding/collapsing main rows
  resetDetailsSelection() {
    this.selectionDetails.clear();
  }

  assignToAll() {
    this.arr=[]
    for (let item of this.selection.selected)
    {
      this.arr.push(item._id)
    }
    // Check if more than one row is selected
    console.log("SELECTION:",this.selection)
    console.log("SELECTION2:",this.selectionDetails)
    if (this.isAssignToAllActive()) {
      // Assuming that you need to pass some data to FeeformComponent, modify this part accordingly
      const dialogRef = this.dialog.open(FeeformComponent, {
        width: '400px',
        disableClose: true,
        data: {
          id: this.arr  // Pass the selected rows to FeeformComponent if needed
        }
      });
  
      // Handle the result from the popup if necessary
      dialogRef.afterClosed().subscribe(result => {
        this.feeAssigner.getFeeData('null').subscribe({
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

  applyFilter(event: Event) {
    this.arr=[]
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

      const filtereddata = this.dataSource.data.filter(item=>{
    return Object.values(item).includes(filterValue.trim().toLowerCase())
    
        })
console.log("====>",filtereddata)
  }



}

  
