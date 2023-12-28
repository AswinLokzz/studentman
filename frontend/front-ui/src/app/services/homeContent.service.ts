// services/homeContent.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { homeContentModel } from '../models/homeContent.model';

@Injectable({
  providedIn: 'root',
})
export class HomeContentService {
  private apiUrl = 'http://localhost:3000'; // Update with your server URL

  constructor(private http: HttpClient) {}

  getContentData(): Observable<homeContentModel[]> {
    return this.http.get<homeContentModel[]>(`${this.apiUrl}/home/icons`);
  }
}
