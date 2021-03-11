import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuardService implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router) {}

    public canActivate() {
        if (!this.auth.isAdmin()) {
            this.router.navigate(["login"]);
            return false;
        }
        return true;
    }
}
