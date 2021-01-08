import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
} from "@angular/core";
import { MonacoDiffEditorComponent } from "@materia-ui/ngx-monaco-editor";
@Component({
    selector: "app-code-editor",
    templateUrl: "./code-editor.component.html",
    styleUrls: ["./code-editor.component.css"],
})
export class CodeEditorComponent implements OnInit {
    @Input() Code: any;
    @Output() codeUpdate = new EventEmitter();
    @ViewChild("editor", { static: true }) editor: MonacoDiffEditorComponent;
    editorOptions = {
        theme: "vs",
        language: "javascript",
    };
    constructor() {}

    ngOnInit() {}
    editorInit(editor) {
        this.editor.editor.setPosition({ lineNumber: 9, column: 1 });
        this.editor.editor.focus();
    }
}
