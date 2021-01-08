import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { ModalService } from "../../services/modal.service";
import { RoutingService } from "../../services/routing.service";
import { ReteService } from "../../services/rete.service";
import { DataTableDirective } from "angular-datatables";
import { DatatableUtil } from "../../classes/DatatableUtil";
import { ToolComponent } from "src/app/classes/tool";
import { ToolService } from "../../services/tool.service";
import { saveAs } from "file-saver";
import { ToolsComponent } from "src/app/tools/tools.component";
class filter {
    name: string = "";
    email: string = "";
    approved: string[] = [];
}
@Component({
    selector: "app-admin-tools",
    templateUrl: "./admin-tools.component.html",
    styleUrls: ["../style.scss"],
})
export class AdminToolsComponent implements OnInit {
    Dt: DatatableUtil = new DatatableUtil();
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    ToolComponents: any = [];
    ReteComponents: any = [];
    SelectedComponent = null;
    SelectedRete = null;
    error: any = null;
    Approved = null;
    view = "components";
    filter: filter = new filter();
    constructor(
        private admin: AdminService,
        private router: RoutingService,
        private modal: ModalService,
        private rete: ReteService,
        private toolservice: ToolService
    ) {}

    ngOnInit() {
        this.getTools();
    }
    getTools(): void {
        this.admin.getTools().subscribe(
            (response) => {
                this.ToolComponents = response;
                this.Dt.triggerNext();
            },
            (errorMessage) => {
                this.error = "Undable to fetch the data";
            }
        );
    }

    getReteComponents(item) {
        this.ReteComponents = [];
        this.SelectedComponent = item;
        this.view = "retes";
        this.rete
            .getComponentRete(this.SelectedComponent._id)
            .subscribe((response) => {
                this.ReteComponents = response;
                this.Dt.triggerNext();
            });
    }
    submit() {
        this.view = "components";
        const data = new FormData();
        data.append("name", this.filter.name),
            data.append("Approved", JSON.stringify(this.filter.approved));
        data.append("email", this.filter.email);
        this.admin.getFilteredTools(data).subscribe(
            (response) => {
                this.ToolComponents = response;
                this.Dt.setDtElement(this.dtElement);
                this.Dt.reloadData();
            },
            (errorMessage) => {
                this.error = "Undable to fetch the Tools";
            }
        );
    }

    onCheckboxChange(event) {
        var value = event.target.value;
        var index = this.filter.approved.indexOf(value);
        if (event.target.checked) this.filter.approved.push(value);
        else this.filter.approved.splice(index, 1);
    }

    editComponent() {
        this.admin
            .updateComponentDetails(
                this.SelectedComponent._id,
                this.SelectedComponent
            )
            .subscribe((response) => {
                this.view = "components";
            });
    }
    deleteComponent(id: string) {
        this.admin.deleteComponent(id).subscribe((response) => {
            this.modal.hide();
            this.submit();
        });
    }
    exportTools() {
        var Tools = [];
        for (var tool of this.ToolComponents) {
            var component = new ToolComponent();
            Tools.push(component.fromJson(tool));
        }
        this.exportToJson(Tools);
    }
    exportToJson(components) {
        const blob = new Blob([JSON.stringify(components)], {
            type: "application/json",
        });
        saveAs(blob, "Sain Components.json");
    }

    importAll(event) {
        if (event.target.files.length > 0) {
            var file = <File>event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onloadend = () => {
                var Tools = JSON.parse(<string>fileReader.result);
                for (var tool of Tools) {
                    var component: ToolComponent = new ToolComponent();
                    component.importFromFile(tool);
                    this.importToDatabse(component);
                }
            };
            fileReader.onerror = (error) => {
                console.log(error);
            };
        }
    }
    importToDatabse(component: ToolComponent) {
        this.toolservice.addToolComponent(component.toFormData()).subscribe(
            (response) => {
                console.log(component.name + " was submited Successfully!;");
            },
            (error) => {
                console.log(error);
            }
        );
    }
    deleteAllTools() {
        for (var tool of this.ToolComponents) this.deleteComponent(tool._id);
        this.modal.hide();
    }
}
