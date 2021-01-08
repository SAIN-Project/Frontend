import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatasetComponent } from "./dataset.component";
import { DatasetDetailsComponent } from "./dataset-details/dataset-details.component";
import {
    NewDatasetComponent,
    EditDatasetComponent,
} from "./new-dataset/new-dataset.component";
import { AuthGuardService as AuthGuard } from "../services/auth-guard.service";

const routes: Routes = [
    {
        path: "dataset",
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "datasets",
            },
            {
                path: "datasets",
                component: DatasetComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "add",
                component: NewDatasetComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "edit/:id",
                component: EditDatasetComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "details/:id",
                component: DatasetDetailsComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DatasetRoutingModule {}
