import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class LoggingInterceptService implements HttpInterceptor{
    intercept(req : HttpRequest<any>,next : HttpHandler){

        console.log('Outgoing Request');
        console.log(req.url);
        return next.handle(req).pipe(
            tap(events =>
                {
                    if(events.type== HttpEventType.Response){
                        console.log('Response Arrived, Body Data :' );
                        console.log(events.body);
                    }
                })
        )
    }
}