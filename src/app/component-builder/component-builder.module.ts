import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";
import { CkEditorModule } from "../ckEditor/ck-editor.module";
import { ComponentGeneratorComponent } from "../node-editor/component-generator/component-generator.component";
import {
    ComponentBuilderComponent,
    EditComponentBuilder,
    OutputForm,
    BasicInformation,
    ComponentCode,
    TextForm,
    FileForm,
    DropDownForm,
    CheckBoxForm,
    SliderForm,
} from "./component-builder.component";
import { MaterialModule } from "../material";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

@NgModule({
    declarations: [
        ComponentBuilderComponent,
        EditComponentBuilder,
        BasicInformation,
        ComponentCode,
        OutputForm,
        TextForm,
        ComponentGeneratorComponent,
        FileForm,
        SliderForm,
        DropDownForm,
        CheckBoxForm,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserModule,
        SharedModule,
        CkEditorModule,
    ],
    exports: [
        ComponentBuilderComponent,
        EditComponentBuilder,
        BasicInformation,
        TextForm,
        FileForm,
        SliderForm,
        DropDownForm,
        CheckBoxForm,
        OutputForm,
    ],
    entryComponents: [
        ComponentBuilderComponent,
        BasicInformation,
        TextForm,
        FileForm,
        SliderForm,
        DropDownForm,
        CheckBoxForm,
        OutputForm,
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: "fill" },
        },
    ],
})
export class ComponentBuilderModule {}
