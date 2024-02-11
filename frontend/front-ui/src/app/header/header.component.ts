import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  state:any

  constructor(private toast:ToastrService, private router:Router){}

  ngOnInit(): void {
    this.state=localStorage.getItem("state")
  }

  viewProfile() {
    // Implement logic for viewing profile

    console.log('View Profile clicked');
  }

  logout() {
    // Implement logout logic
    localStorage.removeItem("Token")
    this.toast.success("Log out Successful")
    this.router.navigate([''])
  }

  navigateToPage(){
    this.router.navigate([''])
  }

}
