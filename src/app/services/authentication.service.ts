import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export interface UserDetails {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    expire: number;
}

interface TokenResponse {
    token: string;
}

@Injectable({
    providedIn: "root",
})
    
export class AuthenticationService {
    url=environment.ApiUrl;
    private token: string;

    constructor(private http: HttpClient, private router: Router) {}
    
    private saveToken(token: string): void {
        localStorage.setItem("usertoken", token);
        this.token = token;
    }

    private getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem("usertoken");
        }
        return this.token;
    }
    public getUserDetails(): UserDetails {
        const token = this.getToken();

        if (token) {
            let payload = token.split(".")[1];
            payload = window.atob(payload);
            var user: UserDetails = JSON.parse(payload);
            return user;
        }
        return null;
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        if (user) {
            var isExpired = user.expire > Date.now() / 1000;
            if (isExpired) this.logout;
            return isExpired;
        }
        return false;
    }

    public isAdmin(): boolean {
        if (this.isLoggedIn()) {
            const user = this.getUserDetails();
            return user.role == "Admin";
        }
        return false;
    }

    public register(user: any): Observable<any> {
        return this.http.post(this.url+"/account/register", user);
    }

    public login(user: any): Observable<any> {
        const base = this.http.post(this.url+"/account/login", user);
        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token);
                }
                return data;
            })
        );
        return request;
    }
    public resetPassword(data:any):Observable<any>{
        return this.http.post(this.url+"/account/resetpassword",data)
    }
    public validatePasswordChange(data:any):Observable<any>{
        return this.http.post(this.url+"/account/validatepasswordreset",data)
    }
    public changePassword(data:any):Observable<any>{
        return this.http.post(this.url+"/account/changepassword",data)
    }


    public resendConfirmationEmail(data:any):Observable<any>{
        return this.http.post(this.url+"/account/resendConfirmationemail",data)
    }
    public AccounVerification(data:any):Observable<any>{
        const base= this.http.post(this.url+"/account/accountverification",data)
        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token);
                }
                return data;
            })
        );
        return request;
    }

    public profile(): Observable<any> {
        return this.http.get(this.url+`/account/profile`, {
            headers: { Authorization: `${this.getToken()}` },
        });
    }

    public logout(): void {
        this.token = null;
        window.localStorage.removeItem("usertoken");
        this.router.navigateByUrl("/login");
    }

    public handleError(errorMessage: any): string {
        var error = "Undefined error";
        if (errorMessage.error) {
            var e = JSON.stringify(errorMessage.error);
            error = JSON.parse(e)["error"];
        }
        return error;
    }
}
