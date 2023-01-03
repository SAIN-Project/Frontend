import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { DataTableDirective } from "angular-datatables";
import { DatatableUtil } from "../../../classes/DatatableUtil";

@Component({
    selector: "app-tools-log",
    templateUrl: "./tools-log.component.html",
    styleUrls: ["./tools-log.component.css"],
})
export class ToolsLogComponent implements OnInit {
    Dt: DatatableUtil = new DatatableUtil();
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    public logs: any = [];
    constructor(public admin: AdminService) {}

    ngOnInit(): void {
        this.admin.getToolslog().subscribe(
            (res) => {
                this.logs = res;
                this.Dt.triggerNext();
            },
            (error) => {
                console.log("error");
            }
        );
    }
}
