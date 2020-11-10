import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoginService } from '../services/login.service';
@Injectable()
export class LoginLoaderInterceptor implements HttpInterceptor {
    constructor(public loginService: LoginService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loginService.show();
        return next.handle(req).pipe(
            finalize(() => this.loginService.hide())
        );
    }
}