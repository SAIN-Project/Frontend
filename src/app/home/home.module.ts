import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";
import { CkEditorModule} from "../ckEditor/ck-editor.module"
import { HomeRoutingModule } from "./home.routing.module";
import {
    ProfileComponent,
    MyDatasetsComponent,
    AccountInfo,
    ToolsComponentsList,
    ComponentRete,
} from "./account/profile/profile.component";
import {
    HeaderOneComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    FooterComponent,
} from "./header/header";
import { ArticlesDetailComponent} from "./articles/articles-detail/articles-detail.component"
import { ArticlesListComponent} from "./articles/articles-list/articles-list.component"
import {EditArticleComponent, NewArticleComponent} from "./articles/new-article/new-article.component"
import { MaterialModule } from "../material";
import { LoginComponent } from "./account/login/login.component";
import { RegisterComponent,AcountVerificationComponent } from "./account/register/register.component";
import { ResetPasswordComponent,NewPasswordComponent} from "./account/login/reset-password.component"
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { AboutSainComponent } from "./about-sain/about-sain.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {FrequentlyAskedQuestionsComponent} from "./frequently-asked-questions/frequently-asked-questions.component"

@NgModule({
    declarations: [
        LoginComponent,ResetPasswordComponent,NewPasswordComponent,
        RegisterComponent,AcountVerificationComponent,
        ContactUsComponent,
        AboutSainComponent,
        ProfileComponent,
        ToolsComponentsList,
        MyDatasetsComponent,
        ComponentRete,
        AccountInfo,
        HeaderOneComponent,
        HeaderTwoComponent,
        HeaderThreeComponent,
        FooterComponent,
        ArticlesDetailComponent,ArticlesListComponent,NewArticleComponent,EditArticleComponent,
        FrequentlyAskedQuestionsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        HomeRoutingModule,
        MaterialModule,
        SharedModule,
        DataTablesModule,
        CkEditorModule
    ],
    exports: [
        HomeRoutingModule,
        ProfileComponent,
        MyDatasetsComponent,
        ComponentRete,
        AccountInfo,
        ToolsComponentsList,
        HeaderOneComponent,
        HeaderTwoComponent,
        HeaderThreeComponent,
        FooterComponent,
    ],
})
export class HomeModule {}
