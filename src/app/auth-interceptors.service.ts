import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorsService implements HttpInterceptor{
   intercept(req : HttpRequest<any>,next : HttpHandler){
                const modifiedReq = req.clone({
            headers: req.headers.append('Auth-key','key'),
        });
        return next.handle(modifiedReq);
   }
}