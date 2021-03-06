import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";

import {
    ComponentBuilderComponent,
    EditComponentBuilder,
} from "./component-builder/component-builder.component";

import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
    //-------------Home page ------------------------
    { path: "", redirectTo: "/aboutsain", pathMatch: "full" },
    {
        path: "componentbuilder/:id",
        component: ComponentBuilderComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "editcomponentbuilder/:id",
        component: EditComponentBuilder,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: "enabled",
            anchorScrolling: "enabled",
            scrollOffset: [0, 64],
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
