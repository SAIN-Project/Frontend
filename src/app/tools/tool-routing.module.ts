import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ToolsComponent } from "./tools.component";

import {
    NewComponentComponent,
    EditComponent,
} from "./new-component/new-component.component";
import { ComponentDatails } from "./tool-details/tool-datails.component";

import { AuthGuardService as AuthGuard } from "../services/auth-guard.service";

const routes: Routes = [
    {
        path: "tool",
        children: [
            {
                path: "",
                pathMatch: "full",
                redirectTo: "tools",
            },
            {
                path: "tools",
                component: ToolsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "add",
                component: NewComponentComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "edit/:id",
                component: EditComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "details/:id",
                component: ComponentDatails,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ToolRoutingModule {}
