import { Component, OnInit, Input, Type } from "@angular/core";
import { Control } from "rete";
import { AngularControl } from "rete-angular-render-plugin";
@Component({
    selector: "app-single-checkbox",
    templateUrl: "./single-checkbox.component.html",
    styleUrls: ["./single-checkbox.component.css"],
})
export class SingleCheckboxComponent implements OnInit {
    @Input() key: string;
    @Input() Title: string;
    @Input() checked!: boolean;
    @Input() change!: Function;
    @Input() mounted!: Function;
    random = Math.random() * 10000;
    ngOnInit() {
        this.mounted();
    }
    onCheckboxChange(event) {
        this.change(event.target.checked);
    }
}

export class SingleCheckboxControl extends Control implements AngularControl {
    component: Type<SingleCheckboxComponent>;
    props: {
        [key: string]: unknown;
    };

    constructor(public emitter, public key, Title, checked = false) {
        super(key);
        this.component = SingleCheckboxComponent;
        this.props = {
            key,
            checked,
            Title,
            value: checked,
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
    setValue(val: any) {
        this.props.value = val;
        this.props.checked = this.props.value;
        this.putData(this.key, this.props.value);
    }
}
