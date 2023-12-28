import { Component } from '@angular/core';
import {formatDate} from '@angular/common';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  

  viewProfile() {
    // Implement logic for viewing profile
    
    console.log('View Profile clicked');
  }

  logout() {
    // Implement logout logic
    console.log('Log Out clicked');
  }
  

}
