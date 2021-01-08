import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { ReteComponent } from "../classes/component";
import { AdminService } from "./admin.service";
import {
    OutputField,
    FileControl,
    TextControl,
    DropDownControl,
    CheckBoxControl,
    SliderControl,
} from "../component-builder/classes";

import { saveAs } from "file-saver";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { environment } from "../../environments/environment";
@Injectable({
    providedIn: "root",
})
export class ComponentBuilderService {
    url = environment.ApiUrl;
    SourceTags: any[] = [];
    SourceSockets: any[] = [];
    ComponentFiles: any[] = [];
    private notify = new Subject<any>();
    notifyObservable$ = this.notify.asObservable();
    Component: ReteComponent = new ReteComponent();

    constructor(private http: HttpClient, private admin: AdminService) {}
    public notifyOther(data: any) {
        if (data) {
            this.notify.next(data);
        }
    }
    addItem(type) {
        switch (type.type) {
            case "file": {
                this.Component.addItem(new FileControl(type));
                break;
            }
            case "range": {
                this.Component.addItem(new SliderControl(type));
                break;
            }
            case "checkbox": {
                this.Component.addItem(new CheckBoxControl(type));
                break;
            }
            case "select": {
                this.Component.addItem(new DropDownControl(type));
                break;
            }
            default: {
                this.Component.addItem(new TextControl(type));
            }
        }
    }
    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer !== event.container) {
            this.addItem(event.item.data);
            var length = this.Component.Inputs.length;
            var previousIndex = length > 0 ? length - 1 : 0;
            moveItemInArray(
                this.Component.Inputs,
                previousIndex,
                event.currentIndex
            );
        } else {
            moveItemInArray(
                this.Component.Inputs,
                event.previousIndex,
                event.currentIndex
            );
            this.notifyOther(true);
        }
    }
    dropoutput(event) {
        if (event.previousContainer !== event.container) {
            this.Component.addOutput(new OutputField());
            var length = this.Component.Outputs.length;
            var previousIndex = length > 0 ? length - 1 : 0;
            moveItemInArray(
                this.Component.Outputs,
                previousIndex,
                event.currentIndex
            );
        } else {
            moveItemInArray(
                this.Component.Outputs,
                event.previousIndex,
                event.currentIndex
            );
            this.notifyOther(true);
        }
    }
    importFromJson(event) {
        if (event.target.files.length > 0) {
            var file = <File>event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onloadend = () => {
                this.Component.fromJson(<string>fileReader.result);
                this.notifyOther(true);
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
        saveAs(blob, "Block-" + this.Component.Name + ".json");
    }
    getTags() {
        this.admin.getDatasetTags().subscribe((response) => {
            this.SourceTags = [];
            var Tags: any = response;
            for (var tag of Tags) {
                for (var value of tag.values) {
                    this.SourceTags.push(value);
                }
            }
        });
    }
    async getSocketsNames() {
        return await this.http
            .get<any>(this.url + "/rete/socketnames/")
            .toPromise();
    }
}
