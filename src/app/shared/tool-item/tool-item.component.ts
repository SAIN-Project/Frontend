import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FileDownloadUploadService } from "../../services/file-download-upload.service";
@Component({
    selector: "app-tool-item",
    templateUrl: "./tool-item.component.html",
    styleUrls: ["./tool-item.component.scss"],
})
export class ToolItemComponent implements OnInit {
    @Input() Tool: any;
    @Input() index: number;
    @Output() contentUpdate = new EventEmitter();
    constructor(private downloader: FileDownloadUploadService) {}

    ngOnInit() {}
    setCategories() {
        var Categories: string[] = [];
        var categories = this.Tool.categories;
        for (var item of categories) {
            Categories = Categories.concat(item.values);
        }
        return Categories;
    }
}

@Component({
    selector: "app-dataset-item",
    templateUrl: "./dataset-item.component.html",
    styleUrls: ["./tool-item.component.scss"],
})
export class DatasetItemComponent implements OnInit {
    @Input() Dataset: any;
    @Input() index: number;
    @Input() TargetTags: any[];
    @Output() contentUpdate = new EventEmitter();
    constructor(private downloader: FileDownloadUploadService) {}

    ngOnInit() {}
    setCategories() {
        var Categories: string[] = [];
        var tags = this.Dataset.tags;
        for (var item of tags) {
            Categories = Categories.concat(item.values);
        }
        return Categories;
    }
}

@Component({
    selector: "app-dataset-files",
    templateUrl: "./dataset-files.html",
    styleUrls: ["./tool-item.component.scss"],
})
export class DatasetFilesDetails implements OnInit {
    @Input() Dataset: any;
    @Input() index: number;
    @Input() TargetTags: any[];
    @Output() contentUpdate = new EventEmitter();
    @Output() SelectedDataset = new EventEmitter();
    constructor(private downloader: FileDownloadUploadService) {}

    ngOnInit() {}
    datasetSelected(item) {
        this.SelectedDataset.emit(item);
    }
    setCategories() {
        var Categories: string[] = [];
        var tags = this.Dataset.tags;
        for (var item of tags) {
            Categories = Categories.concat(item.values);
        }
        return Categories;
    }
}
