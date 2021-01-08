import { Component, Input, Type } from "@angular/core";
import { Control } from "rete";
import { AngularControl } from "rete-angular-render-plugin";

@Component({
    selector: "app-text-input",
    templateUrl: "./text-input.html",
    styleUrls: ["./text-input.scss"],
})
export class TextInputComponent {
    @Input() Title: string;
    @Input() type: string;
    @Input() value!: string;
    @Input() required!: boolean;
    @Input() change!: Function;
    @Input() mounted!: Function;

    ngOnInit() {
        this.mounted();
    }
}

export class TextControl extends Control implements AngularControl {
    component: Type<TextInputComponent>;
    props: {
        [key: string]: unknown;
    };

    constructor(
        public emitter,
        public key,
        Title,
        type = "text",
        required = false
    ) {
        super(key);
        this.component = TextInputComponent;
        this.props = {
            required,
            Title,
            type,
            value: "",
            change: (v) => this.onChange(v),
            mounted: () => {
                this.setValue(
                    (this.getData(key) as any) ||
                        (this.props.type === "number" ? 0 : "")
                );
            },
        };
    }

    validate() {
        var value = <string>this.props.value.toString();
        var result = {
            isValid: true,
            message: "",
        };
        if (this.props.required == true && value.trim() == "") {
            result.isValid = false;
            result.message =
                "Field " +
                this.key +
                " Is required but has incomplete or invalid value!";
        }
        return result;
    }
    onChange(val: any) {
        this.setValue(val);
    }

    setValue(val: string) {
        this.props.value = this.props.type === "number" ? +val : val;
        this.putData(this.key, this.props.value);
    }
}
