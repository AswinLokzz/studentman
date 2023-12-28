// src/app/pages/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { homeContentModel } from 'src/app/models/homeContent.model';
import { HomeContentService } from 'src/app/services/homeContent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public contentData: homeContentModel[] = [];

  constructor(private contentService: HomeContentService, private router:Router) {}

  ngOnInit(): void {
    this.contentService.getContentData().subscribe({
      next:      (data:homeContentModel[]) => {

        this.contentData = data ;
      },
      error:  (error) => {
        console.error('Error fetching content data:', error);
      }
    }

    
    );
  }

  navigateToStudents(){
    this.router.navigate(['/Students']);
  }

  
}
