import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastService } from './ToastService';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn):
  Observable<HttpEvent<unknown>> {
  let toastService = inject(ToastService);
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    // if (error.type === HttpEventType.Response && error.status >= HttpStatusCode.BadRequest) {
    toastService.erro(error.message);
    // }
    return throwError(error);
  }));
}
