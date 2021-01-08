import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { AuthGuardService as AuthGuard } from "../services/auth-guard.service";
import { EditorComponent } from "./Frontend Components/NodeEditorComponents";

const routes: Routes = [
    { path: "editor", component: EditorComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NodeRoutingModule {}
