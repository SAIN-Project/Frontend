import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FileDownloadUploadService } from "../../services/file-download-upload.service";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
interface DirectoryFiles {
    file: string;
    fullpath: string;
    children?: DirectoryFiles[];
}
@Component({
    selector: "app-directory-browser",
    templateUrl: "./directory-browser.component.html",
    styleUrls: ["../shared.scss"],
})
export class DirectoryBrowserComponent implements OnInit {
    treeControl = new NestedTreeControl<DirectoryFiles>(
        (node) => node.children
    );
    dataSource = new MatTreeNestedDataSource<DirectoryFiles>();

    @Input() Files: any;
    @Output() contentUpdate = new EventEmitter();
    constructor(private file: FileDownloadUploadService) {}

    SelectedPath = "";
    ngOnInit() {
        this.dataSource = this.Files;
    }
    onNodeSelcted(fullpath: string) {
        this.SelectedPath = fullpath;
        this.contentUpdate.emit(fullpath);
    }
    hasChild = (_: number, node: DirectoryFiles) =>
        !!node.children && node.children.length > 0;
}
