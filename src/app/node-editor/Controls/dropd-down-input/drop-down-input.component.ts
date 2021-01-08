import { Component, Input, Type, OnInit } from "@angular/core";
import { Control } from "rete";
import { AngularControl } from "rete-angular-render-plugin";

@Component({
    selector: "app-drop-down-input",
    templateUrl: "./drop-down-input.component.html",
    styleUrls: ["./drop-down-input.component.css"],
})
export class DropDownInputComponent implements OnInit {
    @Input() Title: string;
    @Input() list: string[];
    @Input() value: string;
    @Input() change!: Function;
    @Input() mounted!: Function;
    constructor() {}

    ngOnInit() {
        this.mounted();
    }

    onChange(value) {
        this.change(value);
    }
}
export class DropDownControl extends Control implements AngularControl {
    component: Type<DropDownInputComponent>;
    props: {
        [key: string]: unknown;
    };

    constructor(public emitter, public key, list) {
        super(key);
        this.component = DropDownInputComponent;
        this.props = {
            Title: key,
            value: list[0],
            list,
            change: (v) => this.onChange(v),
            mounted: () => {
                this.setValue((this.getData(key) as any) || this.props.value);
            },
        };
    }
    onChange(val: any) {
        this.setValue(val);
    }
    validate() {
        var result = {
            isValid: true,
            message: "",
        };
        return result;
    }
    setValue(val: string) {
        this.props.value = val;
        this.putData(this.key, this.props.value);
    }
}
