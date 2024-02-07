import { Component } from '@angular/core';


interface day {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {
  Days: day[] = [
    {value: '0', viewValue: 'Steak'},
    {value: '1', viewValue: 'Pizza'},
    {value: '2', viewValue: 'Tacos'},
  ];
}
