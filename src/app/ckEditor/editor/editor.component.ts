import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    Renderer2,
    ElementRef,
    ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { config } from "../RichTextBox";
@Component({
    selector: "app-editor",
    templateUrl: "./editor.component.html",
    styleUrls: ["./editor.component.css"],
})
export class EditorComponent implements OnInit {
    @ViewChild("el", { static: true }) el: ElementRef;
    @Input() contents: string;
    @Input() isVisible:boolean;
    Editmode = true;
    @Output() contentUpdate = new EventEmitter();
    public Editor = ClassicEditor;
    public configurations = config;
    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        
    }
    onChange(frm: NgForm) {
        this.contentUpdate.emit(this.contents);
        this.renderer.setProperty(
            this.el.nativeElement,
            "innerHTML",
            this.contents
        );
    }
}
