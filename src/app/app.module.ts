import { BrowserModule } from "@angular/platform-browser";
import { ModalModule, BsModalRef } from "ngx-bootstrap/modal";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppInterceptorService } from "./services/app-interceptor.service";
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HomeModule } from "./home/home.module";
import { DatasetModule } from "./dataset/dataset.module";
import { ToolsModule } from "./tools/tools.module";
import { AdminModule } from "./admin/admin.module";
import { AuthenticationService } from "./services/authentication.service";
import { AuthGuardService } from "./services/auth-guard.service";

import { NodeEditorModule } from "./node-editor/node-editor.module";
import { ComponentBuilderModule } from "./component-builder/component-builder.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        DataTablesModule,
        ModalModule.forRoot(),
        ComponentBuilderModule,
        BrowserAnimationsModule,
        ToolsModule,
        DatasetModule,
        HomeModule,
        AdminModule,
        NodeEditorModule,
    ],

    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptorService,
            multi: true,
        },
        BsModalRef,
        AuthenticationService,
        AuthGuardService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
