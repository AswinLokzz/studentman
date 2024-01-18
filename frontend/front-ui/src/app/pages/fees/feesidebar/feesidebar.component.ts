import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'feesidebar',
  templateUrl: './feesidebar.component.html',
  styleUrls: ['./feesidebar.component.css']
})
export class FeesidebarComponent {

  constructor(private router:Router){}

  navigateToList(){
    this.router.navigate(['/Fees/due'])
  }

  navigateToassign(){
    this.router.navigate(['/Fees/assign'])
  }

}
