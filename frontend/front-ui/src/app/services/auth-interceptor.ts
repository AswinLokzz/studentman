import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';  
import { loginfromservice } from './login.service';
import { Injectable } from '@angular/core';
  
@Injectable()

export class AuthInterceptor implements HttpInterceptor{  
    constructor(private authservice: loginfromservice){}  
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log("I am in autjor -->")  
        const authToken = localStorage.getItem("Token")
        console.log("I am  -->",authToken)  
        const authRequest = req.clone({
            setHeaders: { Authorization: `Bearer ${authToken}` },
          });
        return next.handle(authRequest);  
    }     
}  