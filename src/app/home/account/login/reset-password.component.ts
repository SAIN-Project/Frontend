import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { Router } from "@angular/router";
import { MustMatch } from "../../../_helpers/must-match.validator";
import { ActivatedRoute } from "@angular/router";
@Component({
    selector: "app-reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./login.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    error: string = null;
    success:string=null
    isLoading = false;
    waitingTime=10000;
    RoutingTime=0;
    constructor(
        private auth: AuthenticationService,
        private formBuilder: FormBuilder,
        private router:Router
    ) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
        });
    }
    get f() {
        return this.loginForm.controls;
    }

    reset(){
        this.error=this.success=null;
        this.submitted=true;
        if (this.loginForm.invalid) {
            return;
        }
        this.isLoading=true;
        this.auth.resetPassword(this.loginForm.value).subscribe((response)=>{
           this.RoutingTime=this.waitingTime/1000;
            console.log(response)
            this.success=response.success;
            this.submitted=false;
            this.isLoading=false;
        },(error)=>{
            this.error = this.auth.handleError(error);
            this.submitted=false;
            this.isLoading=false;
        })  
    }
}


@Component({
    selector: "app-new-password",
    templateUrl: "./new-password.component.html",
    styleUrls: ["./login.component.scss"],
})
export class NewPasswordComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    error: string = null;
    success:string=null
    isLoading = false;
    token:string=null;
    waitingTime=10000;
    RoutingTime=0;
    constructor(
        private auth: AuthenticationService,
        private formBuilder: FormBuilder,
        private router:Router,
        private Activerouter: ActivatedRoute,
    ) {}

    async ngOnInit() {
        this.setForms();
        this.token= await this.Activerouter.snapshot.params["token"];
        this.auth.validatePasswordChange({token:this.token}).subscribe((response)=>{
            console.log(response)
        },(error)=>{
           this.error=this.auth.handleError(error)
        })
    }
    setForms(){
        this.loginForm = this.formBuilder.group({
            password: ["", [Validators.required, Validators.minLength(6)]],
            confirmPassword: ["", Validators.required],
        },
        {
            validator: MustMatch("password", "confirmPassword"),
        });
    }
    get f() {
        return this.loginForm.controls;
    }

    changePassword(){
        this.error=null;
        this.submitted=true;
        if (this.loginForm.invalid) {
            return;
        }
        this.isLoading=true;
        var data={
            token:this.token,
            password:this.loginForm.get("password").value
        }
        this.auth.changePassword(data).subscribe((response)=>{
            this.RoutingTime=this.waitingTime/1000;
            this.success=response.success;
            this.submitted=false;
            this.isLoading=false;
            setTimeout(() => {
                this.success = null;
                this.router.navigate(['login']);
                clearInterval(interval)
            }, this.waitingTime);
            var interval=setInterval(()=>{
                this.RoutingTime-=1;
            },1000)
        },(error)=>{
            this.error = this.auth.handleError(error);
            this.submitted=false;
            this.isLoading=false;
        })  
    }
}
