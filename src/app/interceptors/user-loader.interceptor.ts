import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { UserService } from '../services/user.service';
@Injectable()
export class UserLoaderInterceptor implements HttpInterceptor {
    constructor(public userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.userService.show();
        return next.handle(req).pipe(
            finalize(() => this.userService.hide())
        );
    }
}