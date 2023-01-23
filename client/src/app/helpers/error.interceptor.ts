// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// import { AuthenticationService } from '../services/auth.service';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(
//     private authenticationService: AuthenticationService,
//     private router: Router
//   ) {
//   }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let error;
//     return next.handle(request).pipe(catchError(err => {
//       if (err.error.message === 'Token has expired' ||
//         err.error.message === 'Token not provided' ||
//         err.error.message === 'Token Signature could not be verified') {
//         this.authenticationService.logout();
//         location.reload();
//       }
//       if (err.error.errors) {
//         error = err.error.errors.email ?
//           err.error.errors.email :
//           err.error.errors.password;
//         return throwError(error);
//       }
//       error = err.error.error
//         || err.error.message
//         || err.statusText;
//       return throwError(error);
//     }));
//   }
// }
