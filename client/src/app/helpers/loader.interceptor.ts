// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { LoaderService } from '../services/loader.service';

// @Injectable()
// export class LoaderInterceptor implements HttpInterceptor {
//   constructor(private loaderService: LoaderService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     this.onStart(req.url);
//     return next.handle(req).pipe(
//       tap((event: HttpEvent<any>) => {
//         if (event instanceof HttpResponse) {
//           this.onEnd(event.url);
//         }
//       },(err: any) => {
//          this.onEnd(req.url);
//       }));
//     }

//   private onStart(url: string) {
//     this.loaderService.onRequestStart();
//   }

//   private onEnd(url: string): void {
//     this.loaderService.onRequestEnd();
//   }
// }
