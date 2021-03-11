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
import { ArticlesComponent } from './admin-home/articles/articles.component';
import { AuthGuardService as AuthGuard } from "../services/admin-guard.service";
const routes: Routes = [
    {
        path: "admin",
        component: AdminComponent,
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "ToolsAdministration",
                canActivate: [AuthGuard],
            },
            { path: "Dashboard", component: DashboardComponent ,canActivate: [AuthGuard],},
            { path: "UsersAdministration", component: AdminUsersComponent ,canActivate: [AuthGuard],},
            { path: "ToolsAdministration", component: AdminToolsComponent ,canActivate: [AuthGuard],},
            {
                path: "DatasetsAdministration",
                component: AdminDatasetsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "DatasetsAdministration/datasetfilters",
                component: DatasetFiltersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "DatasetsAdministration/datasettags",
                component: TagsComponent,
                canActivate: [AuthGuard],
            },

            {
                path: "ToolsAdministration/filters",
                component: FiltersComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "ToolsAdministration/samples",
                component: SamplesExperimentsComponent,
                canActivate: [AuthGuard],
            },
            { path: "Faqs", component: AdminFaqsComponent,canActivate: [AuthGuard] },
            { path: "Tutorials", component: ArticlesComponent ,canActivate: [AuthGuard]},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
