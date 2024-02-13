import { Component } from '@angular/core';
import { ClasssettingService } from 'src/app/services/classsetting.service';




@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent {
  value:any
  constructor(public nclass:ClasssettingService){}


  panelOpenState = false;

  getValue(card: HTMLHeadingElement) {
    this.value = card.textContent;
    this.nclass.setClass(this.value)
  }
}
