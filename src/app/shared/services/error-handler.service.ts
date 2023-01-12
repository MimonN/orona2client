import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string = '';

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        return throwError(() => new Error(errorMessage));
      })
    )
  }

  public handleError = (error: HttpErrorResponse) => {
    if (error.status === 500) {
      this.handle500Error(error);
    }
    else if (error.status === 404) {
      this.handle404Error(error)
    }
    else if (error.status === 400){
      return this.handleBadRequest(error);
    }
    else if (error.status === 401) {
      return this.handleUnauthorized(error);
    }
    else if (error.status === 403) {
      return this.handleForbidden(error);
    }
    else {
      this.handleOtherError(error);
    }
  }
  private handle500Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }
  private handle404Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }
  private handleBadRequest = (error: HttpErrorResponse): string => {
    if(this.router.url === '/authentication/register'){
      let message = '';
      const values = Object.values(error.error.errors);
      values.map((m: string) => {
         message += m + '<br>';
      })
      return message.slice(0, -4);
    }
    else{
      return error.error ? error.error : error.message;
    }
  }
  private handleUnauthorized = (error: HttpErrorResponse) => {
    if(this.router.url === '/authentication/login') {
      return 'Authentication failed. Wrong Username or Password';
    }
    else {
      this.router.navigate(['/authentication/login'], {queryParams: {returnUrl: this.router.url}});
      return error.message;
    }
  }
  private handleForbidden = (error: HttpErrorResponse) => {
    this.router.navigate(['/forbidden'], {queryParams: {returnUrl: this.router.url}});
    return 'Forbidden';
  }
  private handleOtherError = (error: HttpErrorResponse) => {
    this.createErrorMessage(error); //TODO: this will be fixed later; 
  }
  private createErrorMessage = (error: HttpErrorResponse) => {
    this.errorMessage = error.error ? error.error : error.statusText;
  }
}