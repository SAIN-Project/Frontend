import { Component, OnInit, Input, Type } from "@angular/core";
import { Control } from "rete";
import { AngularControl } from "rete-angular-render-plugin";
import { ModalService } from "../../../services/modal.service";

@Component({
    selector: "app-file-input",
    templateUrl: "./file-input.component.html",
    styleUrls: ["./file-input.component.scss"],
})
export class FileInputComponent implements OnInit {
    @Input() Tags: string[];
    @Input() key: string;
    @Input() Filename: string;
    @Input() value!: any;
    @Input() change!: Function;
    @Input() mounted!: Function;
    FileSource = "";
    TargetTags: string[] = [];
    constructor(public modal: ModalService) {}
    ngOnInit() {
        this.mounted();
        if (this.value) {
            if (this.value["filename"]) {
                this.Filename = this.value["filename"];
                this.FileSource = this.value["FileSource"];
            }
        }
    }
    onChange(event) {
        this.FileSource = "File System";
        if (event.target.files.length > 0) {
            this.Filename = event.target.files[0].name;
            this.change(event.target.files[0]);
        }
    }
    uploadFromDatsets() {
        this.TargetTags = this.Tags.slice();
    }
    FileSelected(event) {
        this.FileSource = "Dataset";
        this.modal.hide();
        this.Filename = event.filename;
        this.change({
            filepath: event.filepath,
            filename: event.filename,
            FileSource: this.FileSource,
        });
    }
}
export class FileControl extends Control implements AngularControl {
    component: Type<FileInputComponent>;
    props: {
        [key: string]: unknown;
    };

    constructor(public emitter, public key, Filename, Tags = []) {
        super(key);
        this.component = FileInputComponent;
        this.props = {
            Tags: Tags,
            key: key,
            value: null,
            Filename,
            change: (v) => this.onChange(v),
            mounted: () => {
                var obj = this.getData(key);
                if (!obj || Object.keys(obj).length == 0) this.setValue(null);
                else this.setValue(this.getData(key));
            },
        };
    }
    onChange(val: any) {
        this.setValue(val);
    }

    validate(): any {
        var result = {
            isValid: true,
            message: "",
        };
        if (this.props.value == null) {
            result.isValid = false;
            result.message =
                "File " +
                this.key +
                " is required and cannot be empty.Please enter a valid input file";
        }
        return result;
    }
    setValue(data: any) {
        this.props.value = data ? data : null;
        this.putData(this.key, this.props.value);
    }
}
