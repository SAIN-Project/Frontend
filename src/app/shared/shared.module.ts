import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "../material";
import { CkEditorModule } from "../ckEditor/ck-editor.module";
import { MiniTagComponent } from "./mini-tag/mini-tag.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { RouterModule } from "@angular/router";
import {
    BasicInformation,
    UploadFiles,
    Categories,
    Publications,
    Authors,
    ParametersInformation,
    Tags,
} from "./sharedcomponents";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import {
    ToolItemComponent,
    DatasetItemComponent,
    DatasetFilesDetails,
} from "./tool-item/tool-item.component";
import { DirectoryBrowserComponent } from "./directory-browser/directory-browser.component";

@NgModule({
    declarations: [
        BasicInformation,
        UploadFiles,
        Categories,
        Publications,
        Authors,
        ParametersInformation,
        Tags,
        MiniTagComponent,
        LoadingSpinnerComponent,
        BreadcrumbComponent,
        ToolItemComponent,
        DatasetItemComponent,
        DatasetFilesDetails,
        DirectoryBrowserComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserModule,
        CkEditorModule,
        RouterModule,
    ],
    exports: [
        BasicInformation,
        UploadFiles,
        Categories,
        Publications,
        Authors,
        ParametersInformation,
        Tags,
        MiniTagComponent,
        LoadingSpinnerComponent,
        BreadcrumbComponent,
        ToolItemComponent,
        DatasetItemComponent,
        DirectoryBrowserComponent,
        DatasetFilesDetails,
    ]
})
export class SharedModule {}
