import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { ToolService } from "../services/tool.service";
import { ModalService } from "../services/modal.service";
import { FileDownloadUploadService } from "../services/file-download-upload.service";
import { ActivatedRoute } from "@angular/router";
import { Dataset } from "../classes/dataset";
import { NgForm } from "@angular/forms";
import {
    Files,
    Categories as Category,
    Publications as PublicationsClass,
    Authors as AuthorClass,
} from "../classes/sharedclasses";

@Component({
    selector: "app-basicinfo",
    templateUrl: "./templates/basicinformation.component.html",
    styleUrls: ["./shared.scss"],
})
export class BasicInformation implements OnInit {
    @Input() Input: any;
    constructor() {}
    ngOnInit() {}
    onChange(form: NgForm) {}
}

@Component({
    selector: "app-component-parameters",
    templateUrl: "./templates/parameters.component.html",
    styleUrls: ["./shared.scss"],
})
export class ParametersInformation implements OnInit {
    @Input() Input: any;
    constructor() {}
    ngOnInit() {}
    onChange(form: NgForm) {
        this.Input.inputs.isValid = form.valid;
    }
}

@Component({
    selector: "app-files-upload",
    templateUrl: "./templates/files.component.html",
    styleUrls: ["./shared.scss"],
})
export class UploadFiles implements OnInit {
    @Input() Files: Files;
    DataFiles: any = [];
    SelectedFile = null;
    _id;
    constructor(
        private modal: ModalService,
        private Activerouter: ActivatedRoute,
        private downloader: FileDownloadUploadService
    ) {}
    async ngOnInit() {
        this._id = await this.Activerouter.snapshot.params["id"];
        if (this._id) this.getFiles();
    }
    getFiles() {
        this.downloader.getDataFiles(this._id).subscribe(
            (response) => {
                this.DataFiles = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    onChange(form: NgForm) {}
    onFileSelected(i: number, event) {
        if (event.target.files.length > 0) {
            this.Files.Filelist[i] = <File>event.target.files[0];
        }
    }
    delete(id: string) {
        this.downloader.deleteDataFile(id).subscribe(
            (response) => {
                this.DataFiles = response;
                this.modal.hide();
            },
            (error) => {
                console.log(error);
            }
        );
    }
}

@Component({
    selector: "app-categories",
    templateUrl: "./templates/categories.component.html",
    styleUrls: ["./shared.scss"],
})
export class Categories implements OnInit {
    @Input() SourceCategories: any;
    @Input() TargetCategories: Category;
    @Input() filters: string;
    @Output() contentUpdate = new EventEmitter();
    id = Math.round(Math.random() * 10000);
    constructor(private toolservice: ToolService) {}
    ngOnInit() {}
    onChange(form: NgForm) {}
    onCheckboxChange(i, event) {
        if (event.target.checked)
            this.TargetCategories.push(event.target.name, event.target.value);
        else this.TargetCategories.pop(event.target.name, event.target.value);
        this.contentUpdate.emit(true);
    }
}

@Component({
    selector: "app-publications",
    templateUrl: "./templates/publications.component.html",
    styleUrls: ["./shared.scss"],
})
export class Publications implements OnInit {
    @Input() Publications: PublicationsClass;
    constructor() {}
    ngOnInit() {}
    onChange(form: NgForm) {
        this.Publications.isValid = form.valid;
    }
}

@Component({
    selector: "app-authors",
    templateUrl: "./templates/authors.component.html",
    styleUrls: ["./shared.scss"],
})
export class Authors implements OnInit {
    @Input() Authors: AuthorClass;
    constructor() {}
    ngOnInit() {}
    onChange(form: NgForm) {
        this.Authors.isValid = form.valid;
    }
}

@Component({
    selector: "app-tags",
    templateUrl: "./templates/tags.html",
    styleUrls: ["./shared.scss"],
})
export class Tags implements OnInit {
    @Input() Db_Tags: any;
    @Input() Dataset: Dataset;
    constructor() {}
    ngOnInit() {}
}
