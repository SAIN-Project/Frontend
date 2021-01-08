import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHeaders,
    HttpParams,
    HttpHandler,
    HttpErrorResponse,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: "root",
})
export class AppInterceptorService implements HttpInterceptor {
    constructor(private auth: AuthenticationService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        var newReq = req.clone();
        window.scrollTo(0, 0);
        if (this.auth.isLoggedIn() == true) {
            const currentUser = this.auth.getUserDetails();
            newReq = req.clone({
                setHeaders: {
                    Authorization: currentUser.email,
                },
                headers: req.headers.append("userid", currentUser._id),
            });
        }
        return next.handle(newReq).pipe(catchError(this.errorHandler));
    }
    errorHandler(error) {
        if (error instanceof HttpErrorResponse) {
            if (error instanceof ErrorEvent) {
                console.log("error event");
            } else {
                switch (error.status) {
                    case 400:
                        console.log("login");
                        break;
                    case 403:
                        console.log("unauthorized");
                }
            }
        }
        console.log(error);
        return throwError(error);
    }
}
