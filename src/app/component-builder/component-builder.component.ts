import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import { ComponentBuilderService } from "../services/component-builder.service";
import { ToolService } from "../services/tool.service";
import { RoutingService } from "../services/routing.service";
import { ModalService } from "../services/modal.service";

import { FileDownloadUploadService } from "../services/file-download-upload.service";
import { NgForm } from "@angular/forms";
import { EventEmitter } from "events";
import {
    OutputField,
    FileControl,
    TextControl,
    DropDownControl,
    CheckBoxControl,
    SliderControl,
} from "./classes";
import { ActivatedRoute } from "@angular/router";
import { ReteComponent } from "../classes/component";
import { ReteService } from "../services/rete.service";

const types = [
    { text: "Text Field", type: "text" },
    { text: "Number Field", type: "number" },
    { text: "Date Field", type: "date" },
    { text: "File Field", type: "file" },
    { text: "Range Field", type: "range" },
    { text: "Dropdown Field", type: "select" },
    { text: "Checkbox Field", type: "checkbox" },
];

@Component({
    selector: "app-component-builder",
    templateUrl: "./component-builder.component.html",
    styleUrls: ["./style.scss"],
})
export class ComponentBuilderComponent implements OnInit {
    types = types.slice();

    Component: any = null;
    @Input() public update: EventEmitter;
    componet_id: string;
    constructor(
        public builder: ComponentBuilderService,
        public toolservice: ToolService,
        public Activerouter: ActivatedRoute,
        public router: RoutingService,
        public downloader: FileDownloadUploadService,
        public rete: ReteService
    ) {}

    async ngOnInit() {
        this.builder.Component = new ReteComponent();
        this.componet_id = await this.Activerouter.snapshot.params["id"];
        this.getComponent();

        this.builder.getTags();
        this.builder.SourceSockets = await this.builder.getSocketsNames();
        if (this.builder.Component.Outputs.length == 0)
            this.builder.Component.addOutput(new OutputField());
    }
    getComponent() {
        this.toolservice
            .getToolComponentById(this.componet_id)
            .subscribe((response) => {
                this.Component = response;
                this.builder.Component.Name = response.name;
                this.builder.Component.owner = this.componet_id;
                this.getFiles();
                var Categories: any[] = this.Component.categories;
                this.builder.Component.Categories = Categories.filter(
                    (item) => item.key == "Category"
                )[0].values;
            });
    }
    getFiles() {
        this.downloader
            .getDirctoryFiles(this.Component.Filepath)
            .subscribe((response) => {
                this.builder.ComponentFiles = response;
            });
    }
    submit() {
        var data = new FormData();

        this.builder.Component.owner = this.componet_id;
        var contents = JSON.stringify(this.builder.Component);
        data.append("name", <string>this.builder.Component.Name);
        data.append("contents", contents);
        data.append("owner", this.componet_id);
        data.append("ToolFilePath", this.builder.Component.ToolFilePath);
        this.rete.addRete(data).subscribe(
            (res) => {
                this.builder.Component = new ReteComponent();
                this.router.navigateTo(
                    "/profile/componentruntimeparameters/" + this.componet_id,
                    {}
                );
            },
            (error) => {
                console.log(error);
            }
        );
    }
}

@Component({
    selector: "app-editcomponent-builder",
    templateUrl: "./component-builder.component.html",
    styleUrls: ["./style.scss"],
})
export class EditComponentBuilder implements OnInit, AfterViewInit {
    Rete_id: string = null;
    ReteComponent: any = null;
    Component: any;
    ComponentFiles: any[] = [];
    constructor(
        public builder: ComponentBuilderService,
        public toolservice: ToolService,
        public router: RoutingService,
        public Activerouter: ActivatedRoute,
        public downloader: FileDownloadUploadService,
        public rete: ReteService
    ) {}
    types = types.slice();
    isLinear = true;
    @Input() public update: EventEmitter;
    async ngOnInit() {
        this.builder.Component = new ReteComponent();
        this.Rete_id = this.Activerouter.snapshot.params["id"];
        this.builder.getTags();
        this.builder.SourceSockets = await this.builder.getSocketsNames();
        this.rete.getReteById(this.Rete_id).subscribe(
            (response) => {
                this.ReteComponent = response;

                var Component_id = this.ReteComponent.owner;
                this.getComponent(Component_id);
                this.builder.Component.fromJson(this.ReteComponent.contents);
                this.builder.Component.owner = this.ReteComponent.owner;
                if (this.builder.Component.Code == "")
                    this.builder.Component.initializeCode();
                if (this.ReteComponent.ToolFilePath)
                    this.builder.Component.ToolFilePath = this.ReteComponent.ToolFilePath;
                this.builder.notifyOther(true);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    async ngAfterViewInit() {}
    getComponent(id) {
        this.toolservice.getToolComponentById(id).subscribe((response) => {
            this.Component = response;
            this.getFiles(this.Component.Filepath);
            var Categories: any[] = this.Component.categories;
            this.builder.Component.Categories = Categories.filter(
                (item) => item.key == "Category"
            )[0].values;
        });
    }
    getFiles(id) {
        this.downloader
            .getDirctoryFiles(this.Component.Filepath)
            .subscribe((response) => {
                this.builder.ComponentFiles = response;
            });
    }
    submit() {
        this.ReteComponent.name = this.builder.Component.Name;
        this.builder.Component.owner = this.Component._id;
        this.ReteComponent.contents = JSON.stringify(this.builder.Component);
        this.ReteComponent.ToolFilePath = this.builder.Component.ToolFilePath;
        this.ReteComponent.owner = this.Component._id;
        this.rete
            .updateRete(this.ReteComponent._id, this.ReteComponent)
            .subscribe(
                (res) => {
                    this.builder.Component = new ReteComponent();
                    this.router.navigateTo(
                        "/profile/componentruntimeparameters/" +
                            this.ReteComponent.owner,
                        {}
                    );
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}

@Component({
    selector: "app-basicinfo-form",
    templateUrl: "./templates/basicinformation.component.html",
    styleUrls: ["./component-builder.component.css"],
})
export class BasicInformation implements OnInit {
    ProgramingLanguages = ["java", "python", "g++", "other"];
    constructor(
        public builder: ComponentBuilderService,
        public modal: ModalService
    ) {}
    ngOnInit() {}
    onChange(form: NgForm) {
        this.builder.notifyOther(true);
    }
    onPathChange(path: string) {
        this.builder.Component.ToolFilePath = path;
    }
    onLanguageChange(event) {
        this.builder.Component.initializeCode();
    }
}

@Component({
    selector: "app-code-form",
    templateUrl: "./templates/code.component.html",
    styleUrls: ["./component-builder.component.css"],
})
export class ComponentCode implements OnInit {
    constructor(public builder: ComponentBuilderService) {}
    ngOnInit() {}
}

@Component({
    selector: "app-output-field",
    templateUrl: "./templates/output.component.html",
    styleUrls: ["./component-builder.component.css"],
})
export class OutputForm implements OnInit {
    @Input() item: OutputField;
    constructor(public builder: ComponentBuilderService) {}
    ngOnInit() {}
    delete() {
        this.builder.Component.deleteOutput(this.item);
        this.builder.notifyOther(true);
    }
    isValid(form: NgForm) {
        this.builder.notifyOther(true);
        this.item.isValid = form.valid;
    }
}

@Component({
    selector: "app-text-control",
    templateUrl: "./templates/textcontrol.component.html",
    styleUrls: ["./component-builder.component.css"],
})
export class TextForm implements OnInit {
    @Input() item: TextControl;
    constructor(public builder: ComponentBuilderService) {}
    ngOnInit() {}
    delete() {
        this.builder.Component.delete(this.item);
        this.builder.notifyOther(true);
    }
    isValid(form: NgForm) {
        this.builder.notifyOther(true);
        this.item.isValid = form.valid;
    }
}

@Component({
    selector: "app-checkbox-control",
    templateUrl: "./templates/checkboxcontrol.component.html",
    styleUrls: ["./component-builder.component.css"],
})
export class CheckBoxForm implements OnInit {
    @Input() item: CheckBoxControl;
    constructor(public builder: ComponentBuilderService) {}
    ngOnInit() {}
    delete() {
        this.builder.Component.delete(this.item);
        this.builder.notifyOther(true);
    }
    isValid(form: NgForm) {
        this.builder.notifyOther(true);
        this.item.isValid = form.valid;
    }
}
@Component({
    selector: "app-file-control",
    templateUrl: "./templates/filecontrol.component.html",
    styleUrls: ["./component-builder.component.css"],
})
export class FileForm implements OnInit {
    @Input() item: FileControl;
    constructor(public builder: ComponentBuilderService) {}

    ngOnInit() {}
    delete() {
        this.builder.Component.delete(this.item);
        this.builder.notifyOther(true);
    }
    isValid(form: NgForm) {
        this.builder.notifyOther(true);
        this.item.isValid = form.valid;
    }
}

@Component({
    selector: "app-slider-control",
    templateUrl: "./templates/slidercontrol.component.html",
    styleUrls: ["./component-builder.component.css"],
})
export class SliderForm implements OnInit {
    @Input() item: SliderControl;
    constructor(public builder: ComponentBuilderService) {}
    ngOnInit() {}
    delete() {
        this.builder.Component.delete(this.item);
        this.builder.notifyOther(true);
    }
    isValid(form: NgForm) {
        this.builder.notifyOther(true);
        this.item.isValid = form.valid;
    }
}

@Component({
    selector: "app-dropdown-control",
    templateUrl: "./templates/dropdowncontrol.component.html",
    styleUrls: ["./component-builder.component.css"],
})
export class DropDownForm implements OnInit {
    @Input() item: DropDownControl;
    constructor(public builder: ComponentBuilderService) {}
    ngOnInit() {}
    delete() {
        this.builder.Component.delete(this.item);
        this.builder.notifyOther(true);
    }
    isValid(form: NgForm) {
        this.builder.notifyOther(true);
        this.item.isValid = form.valid;
    }
    addOption() {
        this.item.options.push("");
    }
    removeOption(i: number) {
        this.item.options.splice(i, 1);
    }
    trackByIndex(index: number) {
        return index;
    }
}
