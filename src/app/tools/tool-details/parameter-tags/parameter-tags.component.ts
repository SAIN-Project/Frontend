import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Tags, Categories, Category } from "../../../classes/sharedclasses";
import { ReteComponent } from "../../../classes/component";
@Component({
    selector: "app-parameter-tags",
    templateUrl: "./parameter-tags.component.html",
    styleUrls: ["../tool-datails.component.scss"],
})
export class ParameterTagsComponent implements OnInit {
    @Input() Rete: ReteComponent[] = [];
    @Output() contentUpdate = new EventEmitter();

    constructor() {}

    ngOnInit() {}
    submit(input, i) {
        input.ComponentName = this.Rete[i].Name;
        this.contentUpdate.emit(input);
    }
}
