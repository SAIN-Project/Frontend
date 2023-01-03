import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    error: string = null;
    unverifiedError=null;
    ConfirmationSuccess=null;
    ConfirmationError=null;
    isLoading = false;
    constructor(
        public auth: AuthenticationService,
        public router: Router,
        public formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(["/"]);
        }
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(6)]],
        });
    }

    get f() {
        return this.loginForm.controls;
    }
    login() {
        this.submitted = true;
        this.error=this.unverifiedError=this.ConfirmationError=this.ConfirmationSuccess=null;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.isLoading = true;
        this.auth.login(this.loginForm.value).subscribe(
            (response) => {
                if (this.auth.isAdmin()) this.router.navigate(["/admin"]);
                else this.router.navigate(["/aboutsain"]);
                
            },
            (error) => {
                if(error.error.unverified){
                    this.unverifiedError=error;
                }else{
                    this.error = this.auth.handleError(error);
                }
                this.isLoading = false;    
            }
        );
        
    }
    resendConfirmationEmil(){
        this.submitted = true;
        this.error=this.unverifiedError=this.ConfirmationError=this.ConfirmationSuccess=null;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.isLoading = true;
        this.auth.resendConfirmationEmail(this.loginForm.value).subscribe((response)=>{
            this.ConfirmationSuccess=response;
            this.isLoading=false;
            this.submitted=false;
            
        },(error)=>{
            this.ConfirmationError=this.auth.handleError(error);
            this.isLoading=false;
            this.submitted=false;
        })
    }
}
