import { Component, OnInit } from "@angular/core";
import { DatasetService } from "../../services/dataset.service";
import { Dataset } from "../../classes/dataset";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { RoutingService } from "../../services/routing.service";
import { ActivatedRoute } from "@angular/router";
import { $ } from "protractor";
import { saveAs } from "file-saver";

@Component({
    selector: "app-new-dataset",
    templateUrl: "./new-dataset.component.html",
    styleUrls: ["./new-dataset.component.scss"],
})
export class NewDatasetComponent implements OnInit {
    Dataset: Dataset = new Dataset();
    Db_Tags: any = null;
    Dataset_id: string = null;
    constructor(
        public dataservice: DatasetService,
        public router: RoutingService
    ) {}
    ngOnInit() {
        this.dataservice.geCategories();
        this.Dataset.Files.addFile();
        this.dataservice.getDatasetTags().subscribe(
            (res) => {
                this.Db_Tags = res;
                for (var item of this.Db_Tags) {
                    this.Dataset.Tags.initializeTags(item.key);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }
    progress = 0;
    isUploading = false;
    submit() {
        this.isUploading = true;
        this.dataservice.addDataset(this.Dataset.toFormData()).subscribe(
            (event) => {
                if (event.type == HttpEventType.UploadProgress) {
                    this.progress = Math.round(
                        (100 * event.loaded) / event.total
                    );
                } else if (event instanceof HttpResponse) {
                    this.router.navigateTo("/profile/mydatasets");
                    this.isUploading = false;
                    this.progress = 0;
                }
            },
            (error) => {
                console.log("Unable to upload the tool");
                this.isUploading = false;
                this.progress = 0;
            }
        );
    }
    importFromJson(event) {
        if (event.target.files.length > 0) {
            var file = <File>event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onloadend = () => {
                var result = JSON.parse(<string>fileReader.result);
                this.Dataset.importFromFile(result);
            };
            fileReader.onerror = (error) => {
                console.log(error);
            };
        }
    }
    exportToJson() {
        const blob = new Blob([JSON.stringify(this.Dataset)], {
            type: "application/json",
        });
        saveAs(blob, "Dataset-" + this.Dataset.name + ".json");
    }
}

@Component({
    selector: "app-edit-dataset",
    templateUrl: "./new-dataset.component.html",
    styleUrls: ["./new-dataset.component.scss"],
})
export class EditDatasetComponent implements OnInit {
    Dataset: Dataset = new Dataset();
    Db_Tags: any = null;
    Dataset_id = null;
    constructor(
        public dataservice: DatasetService,
        public router: RoutingService,
        public Activerouter: ActivatedRoute
    ) {}
    async ngOnInit() {
        this.dataservice.geCategories();
        this.Dataset_id = await this.Activerouter.snapshot.params["id"];
        this.getDataset();
        this.dataservice.getDatasetTags().subscribe(
            (response) => {
                this.Db_Tags = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    getDataset() {
        this.dataservice.getDatasetDetails(this.Dataset_id).subscribe(
            (response) => {
                this.Dataset.fromJson(response);
            },
            (error) => {
                console.log("Unable to Fetch the Dataset");
            }
        );
    }
    progress = 0;
    isUploading = false;
    submit() {
        this.isUploading = true;
        this.dataservice
            .editDataset(this.Dataset_id, this.Dataset.toFormData())
            .subscribe(
                (event) => {
                    if (event.type == HttpEventType.UploadProgress) {
                        this.progress = Math.round(
                            (100 * event.loaded) / event.total
                        );
                    } else if (event instanceof HttpResponse) {
                        this.router.navigateTo("/profile/mydatasets");
                        this.isUploading = false;
                        this.progress = 0;
                    }
                },
                (error) => {
                    console.log("Unable to upload the tool");
                    this.isUploading = false;
                    this.progress = 0;
                }
            );
    }
    importFromJson(event) {
        if (event.target.files.length > 0) {
            var file = <File>event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onloadend = () => {
                var result = JSON.parse(<string>fileReader.result);
                this.Dataset.importFromFile(result);
            };
            fileReader.onerror = (error) => {
                console.log(error);
            };
        }
    }
    exportToJson() {
        const blob = new Blob([JSON.stringify(this.Dataset)], {
            type: "application/json",
        });
        saveAs(blob, "Dataset-" + this.Dataset.name + ".json");
    }
}
