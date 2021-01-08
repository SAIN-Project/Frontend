import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToolService } from "../../services/tool.service";
import { RoutingService } from "../../services/routing.service";
import { ToolComponent } from "src/app/classes/tool";
import { saveAs } from "file-saver";
@Component({
    selector: "app-new-componenr",
    templateUrl: "./new-component.component.html",
    styleUrls: ["../tools.component.scss"],
})
export class NewComponentComponent implements OnInit {
    Component: ToolComponent;
    progress = 0;
    isUploading = false;
    constructor(
        private toolservice: ToolService,
        private router: RoutingService
    ) {
        this.Component = new ToolComponent();
    }
    ngOnInit() {
        this.toolservice.geCategories();
        this.Component.Files.addFile();
        this.Component.authors.push();
        this.Component.publications.push();
        this.Component.inputs.push();
    }

    updateContent($event) {
        this.Component.contents = $event;
    }
    submit() {
        this.isUploading = true;
        this.toolservice
            .addToolComponent(this.Component.toFormData())
            .subscribe(
                (event) => {
                    if (event.type == HttpEventType.UploadProgress) {
                        this.progress = Math.round(
                            (100 * event.loaded) / event.total
                        );
                    } else if (event instanceof HttpResponse) {
                        this.router.navigateTo("/profile/mytools", {});
                        this.isUploading = false;
                        this.progress = 0;
                    }
                },
                (errorMessage) => {
                    console.log("Unable to uplaod the Tool");
                    this.isUploading = false;
                    this.progress = 0;
                }
            );
    }
    importFromJson(event) {
        if (event.target.files.length > 0) {
            var file = <File>event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onloadend = () => {
                var result = JSON.parse(<string>fileReader.result);
                this.Component.importFromFile(result);
            };
            fileReader.onerror = (error) => {
                console.log(error);
            };
        }
    }
    exportToJson() {
        const blob = new Blob([JSON.stringify(this.Component)], {
            type: "application/json",
        });
        saveAs(blob, "Component-" + this.Component.name + ".json");
    }
}

@Component({
    selector: "app-edit-component",
    templateUrl: "./new-component.component.html",
    styleUrls: ["../tools.component.scss"],
})
export class EditComponent implements OnInit {
    Componet_id: string;
    progress = 0;
    isUploading = false;
    Component: ToolComponent = new ToolComponent();
    constructor(
        private toolservice: ToolService,
        private Activerouter: ActivatedRoute,
        private router: RoutingService
    ) {}
    ngOnInit() {
        this.toolservice.geCategories();
        this.Componet_id = this.Activerouter.snapshot.params["id"];
        this.getComponent();
    }
    getComponent() {
        this.toolservice
            .getToolComponentById(this.Componet_id)
            .subscribe((response) => {
                this.Component.fromJson(response);
            });
    }
    updateContent($event) {
        this.Component.contents = $event;
    }
    submit() {
        this.isUploading = true;
        this.toolservice
            .updateToolComponent(this.Componet_id, this.Component.toFormData())
            .subscribe(
                (event) => {
                    if (event.type == HttpEventType.UploadProgress) {
                        this.progress = Math.round(
                            (100 * event.loaded) / event.total
                        );
                    } else if (event instanceof HttpResponse) {
                        var Tool_id = event.body.owner;
                        this.router.navigateTo("/profile/mytools", {});
                        this.isUploading = false;
                        this.progress = 0;
                    }
                },
                (error) => {
                    console.log("Unable to update the Component");
                    this.isUploading = false;
                    this.progress = 0;
                }
            );
    }
    importFromJson(event) {
        if (event.target.files.length > 0) {
            var file = <File>event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onloadend = () => {
                var result = JSON.parse(<string>fileReader.result);
                this.Component.importFromFile(result);
            };
            fileReader.onerror = (error) => {
                console.log(error);
            };
        }
    }
    exportToJson() {
        const blob = new Blob([JSON.stringify(this.Component)], {
            type: "application/json",
        });
        saveAs(blob, "Component-" + this.Component.name + ".json");
    }
}
