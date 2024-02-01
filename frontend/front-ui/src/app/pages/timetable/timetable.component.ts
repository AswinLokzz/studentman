import { Component } from '@angular/core';

@Component({
  selector: 'timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {

  selectedSemester:string=""
  selectedDepartment:string=""

  onChange(){
    console.log(this.selectedSemester)
    console.log(this.selectedDepartment)
  }


}
