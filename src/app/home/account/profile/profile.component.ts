import { Component, OnInit, ViewChild } from "@angular/core";
import { ToolService } from "../../../services/tool.service";
import { ReteService } from "../../../services/rete.service";
import { DatasetService } from "../../../services/dataset.service";
import { ModalService } from "../../../services/modal.service";
import { RoutingService } from "../../../services/routing.service";
import { ActivatedRoute } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { DatatableUtil } from "../../../classes/DatatableUtil";
@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.scss"],
})
export class ProfileComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
@Component({
    selector: "app-accountinfo",
    templateUrl: "./templates/accountinfo.component.html",
    styleUrls: ["./profile.scss"],
})
export class AccountInfo implements OnInit {
    constructor() {}

    ngOnInit() {}
}

@Component({
    selector: "app-mytools-components",
    templateUrl: "./templates/components.component.html",
    styleUrls: ["./profile.scss"],
})
export class ToolsComponentsList implements OnInit {
    Dt: DatatableUtil = new DatatableUtil();
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    Tool_id = null;
    Tool;
    MyComponents: any[] = [];
    SelectedComponent = null;
    constructor(
        private toolservice: ToolService,
        private modal: ModalService,
        private router: RoutingService,
        private ActiveRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getMyTools();
    }

    getMyTools() {
        this.toolservice.getMyTools().subscribe((response) => {
            this.MyComponents = response;

            if(this.MyComponents.length){
                this.Dt.setDtElement(this.dtElement);
                this.Dt.triggerNext();
            }

        });
    }
    delete(id: string) {
        this.toolservice.deleteToolComponent(id).subscribe((response) => {
            this.MyComponents = response;
            this.Dt.setDtElement(this.dtElement);
            this.Dt.reloadData();
            this.modal.hide();
        });
    }
}

@Component({
    selector: "app-ComponentRete",
    templateUrl: "./templates/ComponentRete.component.html",
    styleUrls: ["./profile.scss"],
})
export class ComponentRete implements OnInit {
    Dt: DatatableUtil = new DatatableUtil();
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    ReteComponents: any = null;
    ToolComponent: any;
    Component_id = null;
    SelectedItem = null;
    constructor(
        private toolservice: ToolService,
        private router: RoutingService,
        private modal: ModalService,
        private ActiveRoute: ActivatedRoute,
        private rete: ReteService
    ) {}

    async ngOnInit() {
        this.Component_id = await this.ActiveRoute.snapshot.params["id"];
        this.toolservice
            .getToolComponentById(this.Component_id)
            .subscribe((response) => {
                this.ToolComponent = response;
                this.getComponentRete();
            });
    }
    getComponentRete() {
        this.rete.getComponentRete(this.Component_id).subscribe((response) => {
            this.ReteComponents = response;
            this.Dt.triggerNext();
        });
    }
    delete(id: string) {
        this.rete.deleteRete(id).subscribe(
            (response) => {
                this.ReteComponents = response;
                this.Dt.setDtElement(this.dtElement);
                this.Dt.reloadData();
                this.modal.hide();
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
@Component({
    selector: "app-datasets",
    templateUrl: "./templates/mydatasets.component.html",
    styleUrls: ["./profile.scss"],
})
export class MyDatasetsComponent implements OnInit {
    Dt: DatatableUtil = new DatatableUtil();
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    MyDatasets: any[] = [];
    SelectedDataset = null;
    constructor(
        private dataservice: DatasetService,
        private modal: ModalService,
        private router: RoutingService
    ) {}

    ngOnInit() {
        this.dataservice.getMyDatasets().subscribe(
            (response) => {
                this.MyDatasets = response;
                console.log(response)
                if(this.MyDatasets.length){
                    this.Dt.setDtElement(this.dtElement);
                    this.Dt.triggerNext();
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }
    delete(id: string) {
        this.dataservice.deleteDataset(id).subscribe((response) => {
            this.MyDatasets = response;
            this.Dt.setDtElement(this.dtElement);
            this.Dt.reloadData();
            this.modal.hide();
        });
    }
}
