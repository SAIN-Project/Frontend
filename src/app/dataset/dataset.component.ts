import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { RoutingService } from "../services/routing.service";
import { DatasetService } from "../services/dataset.service";
import { FileDownloadUploadService } from "../services/file-download-upload.service";
import { Categories as Category } from "../classes/sharedclasses";
import { PaginatorConfigurations } from "../classes/util";
import { PageEvent, MatPaginator } from "@angular/material/paginator";

@Component({
    selector: "app-dataset",
    templateUrl: "./dataset.component.html",
    styleUrls: ["./dataset.component.scss"],
})
export class DatasetComponent implements OnInit, AfterViewInit {
    dataset_name = "";
    key = "Tags";
    Categories: Category = new Category();
    Datasets: any[] = [];
    error = null;
    SourceTags: String[] = [];
    TargetTags: String[] = [];
    Paginatorconfigs: PaginatorConfigurations = new PaginatorConfigurations();
    SlicedDatasets = [];
    @ViewChild("paginator", { static: false }) paginator: MatPaginator;

    constructor(
        public dataservice: DatasetService,
        public router: RoutingService,
        public downloader: FileDownloadUploadService
    ) {}

    ngOnInit() {
        this.getDatasets();
        this.dataservice.geCategories();
        this.dataservice.getDatasetTags().subscribe(
            (response) => {
                var Tags: any = response;
                for (var tag of Tags) {
                    for (var value of tag.values) {
                        this.SourceTags.push(value);
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }
    async ngAfterViewInit() {}
    getDatasets(): void {
        this.dataservice.getDatasets().subscribe(
            (response) => {
                this.Datasets = response;
                this.Paginatorconfigs.length = this.Datasets.length;
                this.setPageData(null);
            },
            (errorMessage) => {
                this.error = errorMessage;
                console.log(errorMessage);
            }
        );
    }
    filter() {
        var data = new FormData();
        data.append("name", this.dataset_name);
        data.append("categories", this.Categories.toJsonString());
        data.append("tags", JSON.stringify(this.TargetTags));
        this.dataservice.getFilteredData(data).subscribe(
            (response) => {
                this.Datasets = response;
                this.Datasets = response;
                this.Paginatorconfigs.length = this.Datasets.length;
                this.setPageData(null);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    filterByTag(tag: any) {
        this.TargetTags = [tag];
        this.dataservice.getFilteredDataByTag(tag).subscribe(
            (response) => {
                this.Datasets = response;
                this.Paginatorconfigs.length = this.Datasets.length;
                this.setPageData(null);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    updateContent($event) {
        this.filter();
    }
    reset() {
        this.getDatasets();
    }
    setPageData(event: PageEvent) {
        if (event) {
            const startIndex = event.pageIndex * event.pageSize;
            this.Paginatorconfigs.CurrentIndex = startIndex;
            var endIndex = startIndex + event.pageSize;
            if (endIndex > event.length) endIndex = event.length;
            this.SlicedDatasets = this.Datasets.slice(startIndex, endIndex);
        } else {
            var endIndex = this.Paginatorconfigs.pageSize;
            if (endIndex > this.Paginatorconfigs.length)
                endIndex = this.Paginatorconfigs.length;
            this.Paginatorconfigs.CurrentIndex = 0;
            this.SlicedDatasets = this.Datasets.slice(0, endIndex);
            this.paginator.pageIndex = 0;
        }
        return event;
    }
}
