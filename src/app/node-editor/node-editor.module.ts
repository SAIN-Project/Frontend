import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NodeRoutingModule } from "./node-routing.module";
import { SharedModule } from "../shared/shared.module";
import { DatasetModule } from "../dataset/dataset.module";
import { MaterialModule } from "../material";
import { DataTablesModule } from "angular-datatables";
import { ReteModule } from "rete-angular-render-plugin";
import {
    EditorComponent,
    TerminalComponent,
    ListComponent,
    OutputBlackboardComponent,
    NavbarComponent,
    DockerConnecter
} from "./Frontend Components/NodeEditorComponents";
import {
    MyNodeComponent,
    MyNodeDependencyComponent,
    DetailsDependencycomponent,
} from "./Nodes/node/node.component";
import { TextInputComponent } from "./Controls/text-input/text-input.component";
import { FileInputComponent } from "./Controls/file-input/file-input.component";
import { SliderInputComponent } from "./Controls/slider-input/slider-input.component";
import { DropDownInputComponent } from "./Controls/dropd-down-input/drop-down-input.component";
import { SingleCheckboxComponent } from "./Controls/single-checkbox/single-checkbox.component";

import { SocketComponent } from "./Nodes/node/socket/socket.component";
import { JointComponent } from "./Nodes/joint/joint.component";
import { NodeBiulderComponent } from "./component-generator/node-biulder/node-biulder.component";
import { ComponentDependency } from "./component-generator/component-dependency";

@NgModule({
    declarations: [
        MyNodeComponent,
        DetailsDependencycomponent,
        MyNodeDependencyComponent,
        TextInputComponent,
        FileInputComponent,
        SliderInputComponent,
        DropDownInputComponent,
        SocketComponent,
        SingleCheckboxComponent,
        JointComponent,
        NodeBiulderComponent,
        EditorComponent,
        TerminalComponent,
        ListComponent,
        OutputBlackboardComponent,
        NavbarComponent,
        DockerConnecter,
        ComponentDependency,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        ReteModule,
        MaterialModule,
        SharedModule,
        NodeRoutingModule,
        DataTablesModule,
        DatasetModule,
    ]
})
export class NodeEditorModule {}
