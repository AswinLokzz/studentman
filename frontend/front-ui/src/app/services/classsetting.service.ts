import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClasssettingService {
  class: string = '';

  constructor() { }

  setClass(className: string): void {
    this.class = className;
  }

  getClass(){
    return this.class
  }
}
