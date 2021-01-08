import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "../material";
import { SharedModule } from "../shared/shared.module";

import { DatasetComponent } from "../dataset/dataset.component";
import {
    NewDatasetComponent,
    EditDatasetComponent,
} from "./new-dataset/new-dataset.component";

import { DatasetRoutingModule } from "./dataset-routing.module";
import { DatasetDetailsComponent } from "./dataset-details/dataset-details.component";
import { DatasetsSearchFiles } from "./datasets-search-files/datasets-search-files.component";

@NgModule({
    declarations: [
        DatasetComponent,
        NewDatasetComponent,
        EditDatasetComponent,
        DatasetDetailsComponent,
        DatasetsSearchFiles,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserModule,
        SharedModule,
        DatasetRoutingModule,
    ],
    exports: [
        DatasetComponent,
        NewDatasetComponent,
        EditDatasetComponent,
        DatasetsSearchFiles,
    ],
})
export class DatasetModule {}
