import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const cloneReq = req.clone({ withCredentials: true });

  return next(cloneReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if(error.status === 401){
        console.log("token expirado");
        auth.cerrarSesion();
      }
      return throwError(()=>error);
    })
  );
};
