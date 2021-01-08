import { Component, ChangeDetectorRef } from "@angular/core";
import { NodeComponent, NodeService } from "rete-angular-render-plugin";
@Component({
    templateUrl: "./joint.component.html",
    styleUrls: ["./joint.component.sass"],
    providers: [NodeService],
})
export class JointComponent extends NodeComponent {
    public max: boolean = true;
    constructor(
        protected service: NodeService,
        protected cdr: ChangeDetectorRef
    ) {
        super(service, cdr);
    }
}
