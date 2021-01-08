import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin/admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminDatasetsComponent } from "./admin-datasets/admin-datasets.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { AdminToolsComponent } from "./admin-tools/admin-tools.component";
import { FiltersComponent } from "./admin-tools/filters/filters.component";
import { DatasetFiltersComponent } from "./admin-datasets/filters/filters.component";
import { SamplesExperimentsComponent } from "./admin-tools/samples-experiments/samples-experiments.component";
import { TagsComponent } from "./admin-datasets/tags/tags.component";
import { AdminFaqsComponent } from "./admin-home/admin-faqs/admin-faqs.component";
const routes: Routes = [
    {
        path: "admin",
        component: AdminComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "ToolsAdministration",
            },
            { path: "Dashboard", component: DashboardComponent },
            { path: "UsersAdministration", component: AdminUsersComponent },
            { path: "ToolsAdministration", component: AdminToolsComponent },
            {
                path: "DatasetsAdministration",
                component: AdminDatasetsComponent,
            },
            {
                path: "DatasetsAdministration/datasetfilters",
                component: DatasetFiltersComponent,
            },
            {
                path: "DatasetsAdministration/datasettags",
                component: TagsComponent,
            },

            {
                path: "ToolsAdministration/filters",
                component: FiltersComponent,
            },
            {
                path: "ToolsAdministration/samples",
                component: SamplesExperimentsComponent,
            },
            { path: "Faqs", component: AdminFaqsComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
