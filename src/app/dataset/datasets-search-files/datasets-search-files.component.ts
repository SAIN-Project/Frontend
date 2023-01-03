import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    EventEmitter,
} from "@angular/core";
import { RoutingService } from "../../services/routing.service";
import { DatasetService } from "../../services/dataset.service";
import { FileDownloadUploadService } from "../../services/file-download-upload.service";
import { Categories as Category } from "../../classes/sharedclasses";
import { PaginatorConfigurations } from "../../classes/util";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { Dataset, fileSizeFormat } from "../../classes/dataset";
@Component({
    selector: "app-datasets-search-files",
    templateUrl: "./datasets-search-files.component.html",
    styleUrls: [
        "../dataset.component.scss",
        "../dataset-details/dataset-details.component.scss",
    ],
})
export class DatasetsSearchFiles implements OnInit {
    @Input() TargetTags: string[];
    @Output() SelectedFile = new EventEmitter();
    dataset_name = "";
    key = "Tags";
    Categories: Category = new Category();
    Datasets: any[] = [];
    error = null;
    SourceTags: String[] = [];
    Paginatorconfigs: PaginatorConfigurations = new PaginatorConfigurations();
    SlicedDatasets = [];
    SelectedDataset: Dataset = new Dataset();
    DatasetFiles: any[] = [];
    view = "datasets";
    @ViewChild("paginator", { static: false }) paginator: MatPaginator;

    constructor(
        public dataservice: DatasetService,
        public router: RoutingService,
        public downloader: FileDownloadUploadService
    ) {}
    ngOnInit() {
        this.filter();
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
    DatasetSelected(event) {
        this.SelectedDataset.fromJson(event);
        this.getFiles();
        this.view = "details";
    }
    getFiles() {
        this.dataservice.getDatasetFiles(this.SelectedDataset._id).subscribe(
            (response) => {
                this.DatasetFiles = response;
            },
            (error) => {
                console.log(error);
            }
        );
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
    sizeFormat(size: string) {
        return fileSizeFormat(size);
    }
    fileSelected(file: any) {
        this.SelectedFile.emit(file);
    }
}
