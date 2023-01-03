import { Component, OnInit } from "@angular/core";
import { DatasetService } from "../../services/dataset.service";
import { RoutingService } from "../../services/routing.service";
import { FileDownloadUploadService } from "../../services/file-download-upload.service";
import { ActivatedRoute } from "@angular/router";
import { Dataset, fileSizeFormat } from "../../classes/dataset";
import { Categories, Tags, Category, Tag } from "../../classes/sharedclasses";
@Component({
    selector: "app-dataset-details",
    templateUrl: "./dataset-details.component.html",
    styleUrls: ["./dataset-details.component.scss"],
})
export class DatasetDetailsComponent implements OnInit {
    Dataset_id = null;
    Dataset: Dataset = new Dataset();
    DatasetFiles = [];
    SourceCategories: Category[] = [];
    SourceTags: Tag[] = [];
    view = "details";
    Datasets: any[] = [];

    constructor(
        public dataservice: DatasetService,
        public Activerouter: ActivatedRoute,
        public downloader: FileDownloadUploadService,
        public router: RoutingService
    ) {}

    async ngOnInit() {
        this.Activerouter.params.subscribe((routeParams) => {
            this.Dataset_id = routeParams.id;
            this.Dataset = new Dataset();
            this.view = "details";
            this.getDataset();
            this.setSources();
            this.getFiles();
        });
    }
    navigateTo(id: string) {
        this.view = "details";
        this.router.navigateTo("/dataset/details/" + id);
    }
    getDataset() {
        this.dataservice.geCategories();
        this.dataservice.getDatasetDetails(this.Dataset_id).subscribe(
            (response) => {
                this.Dataset.fromJson(response);
            },
            (error) => {
                console.log("Unable to Fetch the Dataset");
            }
        );
    }
    setSources() {
        this.dataservice.getDatasetDetails(this.Dataset_id).subscribe(
            (response) => {
                this.SourceCategories = response.categories;
                this.SourceTags = response.tags;
            },
            (error) => {
                console.log("Unable to Fetch the Dataset");
            }
        );
    }
    getFiles() {
        this.dataservice.getDatasetFiles(this.Dataset_id).subscribe(
            (response) => {
                this.DatasetFiles = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    updateContent(event) {
        if (this.view == "list") this.filter();
    }
    copy(value: string) {
        navigator.clipboard
            .writeText(value)
            .then()
            .catch((e) => console.error(e));
    }
    sizeFormat(size: string) {
        return fileSizeFormat(size);
    }
    filter() {
        var data = new FormData();
        data.append("name", "");
        data.append("categories", this.Dataset.Categories.toJsonString());
        data.append("tags", JSON.stringify(this.Dataset.Tags.toArray()));
        this.dataservice.getFilteredData(data).subscribe(
            (response) => {
                this.Datasets = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
