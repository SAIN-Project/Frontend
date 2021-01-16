import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthenticationService } from "../../../services/authentication.service";
import { MustMatch } from "../../../_helpers/must-match.validator";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["../login/login.component.scss"],
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    private error: string;
    isLoading = false;
    success:string;
    ConfirmationSuccess=null;
    ConfirmationError=null;
    constructor(
        private auth: AuthenticationService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group(
            {
                firstname: ["", Validators.required],
                lastname: ["", Validators.required],
                email: ["", [Validators.required, Validators.email]],
                password: ["", [Validators.required, Validators.minLength(6)]],
                confirmPassword: ["", Validators.required],
            },
            {
                validator: MustMatch("password", "confirmPassword"),
            }
        );
    }
    get f() {
        return this.registerForm.controls;
    }
    register() {
        this.submitted = true;
        this.error=this.success=this.ConfirmationError=this.ConfirmationSuccess=null;
        if (!this.registerForm.valid) {
            return;
        }
        this.isLoading = true;
        this.auth.register(this.registerForm.value).subscribe(
            (response) => {
                this.success=response.success;
                this.isLoading=false;
                //this.router.navigate(["/login"]);
            },
            (error) => {
                if(error.error.confirmationerror){
                    this.ConfirmationError=error.error.confirmationerror;
                }else{
                    this.error = this.auth.handleError(error);
                }
                this.isLoading=false;
            }
        );
    }
    resendConfirmationEmail(){
        this.submitted = true;
        this.error=this.success=this.ConfirmationError=this.ConfirmationSuccess=null;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.isLoading = true;
        this.auth.resendConfirmationEmail(this.registerForm.value).subscribe((response)=>{
            this.ConfirmationSuccess=response;
            this.isLoading=false;
            this.submitted=false;
            
        },(error)=>{
            if(error.error.confirmationerror){
                this.ConfirmationError=error.error.confirmationerror;
            }else{
                this.ConfirmationError=this.auth.handleError(error);
            }
            
            this.isLoading=false;
            this.submitted=false;
            this.isLoading=false;
        })
    }
}

@Component({
    selector: "app-Account-Confirmation",
    templateUrl: "./accountconfirmation.component.html",
    styleUrls: ["../login/login.component.scss"],
})
export class AcountVerificationComponent implements OnInit {
    error: string = null;
    success:string=null
    isLoading = false;
    token:string=null;
    waitingTime=10000;
    RoutingTime=0;
    constructor(
        private auth: AuthenticationService,
        private router:Router,
        private Activerouter: ActivatedRoute,
    ) {}

    async ngOnInit() {
        this.isLoading=true;
        this.token= await this.Activerouter.snapshot.params["token"];
        this.auth.AccounVerification({token:this.token}).subscribe((response)=>{
            console.log(response)
            this.isLoading=false;
            this.success=response;
            this.RoutingTime=this.waitingTime/1000;
            setTimeout(() => {
                this.success = null;
                clearInterval(interval)
                if (this.auth.isAdmin()) this.router.navigate(["/admin"]);
                else this.router.navigate(["/aboutsain"]);
            }, this.waitingTime);
            var interval=setInterval(()=>{
                this.RoutingTime-=1;
            },1000)
        },(error)=>{
            this.isLoading=false;
           this.error=this.auth.handleError(error)
        })
    }
}

