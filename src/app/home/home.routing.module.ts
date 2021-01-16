import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
    ProfileComponent,
    MyDatasetsComponent,
    AccountInfo,
    ToolsComponentsList,
    ComponentRete,
} from "./account/profile/profile.component";
import { LoginComponent } from "./account/login/login.component";
import { ResetPasswordComponent,NewPasswordComponent} from "./account/login/reset-password.component"
import { RegisterComponent ,AcountVerificationComponent} from "./account/register/register.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { AboutSainComponent } from "./about-sain/about-sain.component";
import { AuthGuardService as AuthGuard } from "../services/auth-guard.service";
import { ArticlesDetailComponent} from "./articles/articles-detail/articles-detail.component"
import { ArticlesListComponent} from "./articles/articles-list/articles-list.component"

const routes: Routes = [
    {
        path: "profile",
        component: ProfileComponent,

        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "account",
            },
            {
                path: "mytools",
                component: ToolsComponentsList,
            },
            {
                path: "componentruntimeparameters/:id",
                component: ComponentRete,
            },
            {
                path: "mydatasets",
                component: MyDatasetsComponent,
            },
            {
                path: "account",
                component: AccountInfo,
            },
        ],
    },
    {
        path: "aboutsain",
        component: AboutSainComponent,
        canActivate: [AuthGuard],
    },
    {
        path:"toturials",
        component:ArticlesListComponent
    },
    {
        path:"toturials/:name",
        component:ArticlesDetailComponent
    },
    { path: "login", component: LoginComponent },
    { path: "resetpassword", component: ResetPasswordComponent },
    { path: "newpassword/:email/:token", component: NewPasswordComponent },
    { path: "confirmation/:email/:token", component: AcountVerificationComponent},
    { path: "register", component: RegisterComponent },
    { path: "contactus", component: ContactUsComponent },
    { path: "contactus", component: ContactUsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
