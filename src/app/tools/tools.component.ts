import { Component, OnInit, ViewChild } from "@angular/core";

import { Categories } from "../classes/sharedclasses";
import { ToolService } from "../services/tool.service";
import { FileDownloadUploadService } from "../services/file-download-upload.service";
import { PaginatorConfigurations } from "../classes/util";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
@Component({
    selector: "app-tools",
    templateUrl: "./tools.component.html",
    styleUrls: ["./tools.component.scss"],
})
export class ToolsComponent implements OnInit {
    Categories = new Categories();
    Tools = null;
    error = null;
    tool_name = "";
    isLoading = false;
    Paginatorconfigs: PaginatorConfigurations = new PaginatorConfigurations();
    SlicedTools = [];
    @ViewChild("paginator", { static: false }) paginator: MatPaginator;

    constructor(
        private toolservice: ToolService,
        private downloader: FileDownloadUploadService
    ) {}

    ngOnInit() {
        this.getTools();
    }
    getTools() {
        this.toolservice.getComponents().subscribe(
            (response) => {
                this.Tools = response;
                this.Paginatorconfigs.length = this.Tools.length;
                this.setPageData(null);
                this.isLoading = false;
            },
            (errorMessage) => {
                this.error = "Undable to load the Tools";
                this.isLoading = false;
            }
        );
    }
    updateContent($event) {
        var data = new FormData();
        data.append("name", this.tool_name);
        data.append("categories", this.Categories.toJsonString());
        this.toolservice.getFilteredTools(data).subscribe(
            (response) => {
                this.Tools = response;
                this.Paginatorconfigs.length = this.Tools.length;
                this.setPageData(null);
            },
            (error) => {
                console.log(error);
            }
        );
        console.log(this.Categories);
    }
    setPageData(event: PageEvent) {
        if (event) {
            const startIndex = event.pageIndex * event.pageSize;
            this.Paginatorconfigs.CurrentIndex = startIndex;
            var endIndex = startIndex + event.pageSize;
            if (endIndex > event.length) endIndex = event.length;
            this.SlicedTools = this.Tools.slice(startIndex, endIndex);
        } else {
            var endIndex = this.Paginatorconfigs.pageSize;
            if (endIndex > this.Paginatorconfigs.length)
                endIndex = this.Paginatorconfigs.length;
            this.Paginatorconfigs.CurrentIndex = 0;
            this.SlicedTools = this.Tools.slice(0, endIndex);
            this.paginator.pageIndex = 0;
        }
        return event;
    }
}
