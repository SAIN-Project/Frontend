import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Input,
} from "@angular/core";
import { ReteHttpService } from "../../services/rete-http.service";
import * as Generator from "./Components";
import { Subscription } from "rxjs";
import { Editor } from "../Classes/Editor";
import { ComponentBuilderService } from "../../services/component-builder.service";
@Component({
    selector: "app-component-generator",
    templateUrl: "./component-generator.component.html",
    styleUrls: ["./component-generator.component.css"],
})
export class ComponentGeneratorComponent implements OnInit, AfterViewInit {
    @Input() data: any;
    Editor: Editor = new Editor(this.http);
    position = null;
    private subscription: Subscription;
    @ViewChild("nodeEditor", { static: true }) nodeElement: ElementRef;
    constructor(
        private http: ReteHttpService,
        private builder: ComponentBuilderService
    ) {}

    ngOnInit() {}
    async ngAfterViewInit() {
        var container = this.nodeElement.nativeElement;
        this.position = {
            x: container.offsetWidth / 2 - 400 / 2,
            y: 50,
        };
        this.Editor.createEditor(this.nodeElement.nativeElement);
        this.builder.notifyObservable$.subscribe((res) => {
            if (this.builder.Component.Name != "") this.refreshEditor();
        });
    }
    async refreshEditor() {
        var component = new Generator.GeneratedComponent(
            this.builder.Component.Name,
            this.data
        );
        this.Editor.components = [component];
        this.Editor.InitializeComponents();
        this.createNode();
    }
    async createNode() {
        this.Editor.Editor.clear();
        var node = await this.Editor.createNode(
            this.Editor.components[0],
            this.position
        );
        this.Editor.Editor.addNode(node);
    }
}
