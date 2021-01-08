import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { EditorComponent } from "./editor/editor.component";
import { FormsModule } from "@angular/forms";
import { CodeEditorComponent } from "./code-editor/code-editor.component";
import { MonacoEditorModule, MONACO_PATH } from "@materia-ui/ngx-monaco-editor";
@NgModule({
    declarations: [EditorComponent, CodeEditorComponent],
    imports: [CommonModule, FormsModule, CKEditorModule, MonacoEditorModule],
    providers: [
        {
            provide: MONACO_PATH,
            useValue: "https://unpkg.com/monaco-editor@0.18.1/min/vs",
        },
    ],
    exports: [EditorComponent, CodeEditorComponent],
})
export class CkEditorModule {}
