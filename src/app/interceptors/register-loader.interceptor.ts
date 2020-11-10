import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { RegisterService } from '../services/register.service';
@Injectable()
export class RegisterLoaderInterceptor implements HttpInterceptor {
    constructor(public registerService: RegisterService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.registerService.show();
        return next.handle(req).pipe(
            finalize(() => this.registerService.hide())
        );
    }
}