import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "../material";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

import { CkEditorModule } from "../ckEditor/ck-editor.module";
import { ToolRoutingModule } from "./tool-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ComponentDatails } from "./tool-details/tool-datails.component";
import {
    NewComponentComponent,
    EditComponent,
} from "./new-component/new-component.component";
import { ToolsComponent } from "./tools.component";
import { ParameterTagsComponent } from "./tool-details/parameter-tags/parameter-tags.component";

@NgModule({
    declarations: [
        ToolsComponent,
        NewComponentComponent,
        ComponentDatails,
        EditComponent,
        ParameterTagsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserModule,
        CkEditorModule,
        SharedModule,
        ToolRoutingModule,
    ],
    exports: [NewComponentComponent, EditComponent],
})
export class ToolsModule {}
