import {
    Component,
    OnInit,
    Output,
    Input,
    ElementRef,
    ViewChild,
    EventEmitter,
} from "@angular/core";
import {
    MatAutocompleteSelectedEvent,
    MatAutocomplete,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
    selector: "app-mini-tag",
    templateUrl: "./mini-tag.component.html",
    styleUrls: ["./mini-tag.component.css"],
})
export class MiniTagComponent implements OnInit {
    @Input() SourceTags: any[];
    @Input() TargetTags: any[];
    @Input() key: any;
    @Output() contentUpdate = new EventEmitter();

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    tagCtrl: FormControl = new FormControl();
    filteredTags: Observable<string[]>;

    @ViewChild("tagInput", { static: true })
    tagInput: ElementRef<HTMLInputElement>;
    @ViewChild("auto", { static: true }) matAutocomplete: MatAutocomplete;
    constructor() {}

    ngOnInit() {
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) =>
                tag ? this._filter(tag) : this.SourceTags.slice()
            )
        );
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        var value = event.value;

        // Add our fruit
        if ((value || "").trim()) {
            value = value.trim();
            if (this.TargetTags.indexOf(value) == -1) {
                this.TargetTags.push(value.trim());
                this.contentUpdate.emit(true);
            }
        }
        // Reset the input value
        if (input) {
            input.value = "";
        }
    }
    remove(tag): void {
        const index = this.TargetTags.indexOf(tag);

        if (index >= 0) {
            this.TargetTags.splice(index, 1);
            this.contentUpdate.emit(true);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.tagCtrl.setValue(null);
        var value = event.option.viewValue;
        if (this.TargetTags.indexOf(value) == -1) {
            this.TargetTags.push(value);
            this.contentUpdate.emit(true);
        }
        this.tagInput.nativeElement.value = "";
    }
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.SourceTags.filter(
            (tag) => tag.toLowerCase().indexOf(filterValue) === 0
        );
    }
}
