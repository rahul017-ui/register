import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler,HttpInterceptor,HttpRequest } from "@angular/common/http";
import { UserService } from "./user.service";
import { catchError, Observable, throwError } from "rxjs";
@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private userService: UserService) {} 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = this.userService.getAuthToken();
        console.log(token)
         if (token) {
          req = req.clone({
             setHeaders: {Authorization: `Authorization token ${token}`}
          });
       }
       return next.handle(req).pipe(
           catchError((err) => {
             if (err instanceof HttpErrorResponse) {
                 if (err.status === 401) {
           }
           }
           return throwError(err);
         })
        )
       }
     }

    
