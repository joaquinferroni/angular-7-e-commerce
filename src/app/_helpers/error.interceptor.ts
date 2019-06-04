import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { LoginService } from '../_services/login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private loginService: LoginService,
      private router: Router,
      private snackBar: MatSnackBar
      ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.loginService.logout();
                this.router.navigate(['login']);
            } else if( err.status === 0 ) {
              this.snackBar.open('Ocurrió un problema en la comunicación con el servidor. Por favor vuelva a intentar', 'OK', {
                duration: 5000,
              });
            }

            const error = err.error.error || err.statusText;
            if (err.error.showErrorMessage && err.error.error){
                this.snackBar.open(error, 'OK', {
                    duration: 5000,
                  });
            }
            return throwError(error);
        }));
    }
}
