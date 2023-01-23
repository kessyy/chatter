import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class EnvironmentInterceptor implements HttpInterceptor {
  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const update = {} as any;
    update.url = req.url.includes('https') ? req.url :
      `${environment.apiEndpoint}/${req.url}`;
    return next.handle(req.clone(update));
  }
}
