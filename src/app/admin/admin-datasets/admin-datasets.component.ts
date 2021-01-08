import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { ModalService } from "../../services/modal.service";
import { RoutingService } from "../../services/routing.service";
import { ReteService } from "../../services/rete.service";
import { DataTableDirective } from "angular-datatables";
import { DatatableUtil } from "../../classes/DatatableUtil";

declare var $: any;
class filter {
    name: string = "";
    email: string = "";
    approved: string[] = [];
}
@Component({
    selector: "app-admin-datasets",
    templateUrl: "./admin-datasets.component.html",
    styleUrls: ["../style.scss"],
})
export class AdminDatasetsComponent implements OnInit {
    Dt: DatatableUtil = new DatatableUtil();
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    Datasets: any[] = [];
    error = null;
    SelectedDataset = null;
    Editmode = false;
    filter: filter = new filter();
    constructor(
        private admin: AdminService,
        private router: RoutingService,
        private modal: ModalService,
        private rete: ReteService
    ) {}

    ngOnInit() {
        var component = this;
        $(document).ready(function () {
            component.Dt.setDtElement(component.dtElement);
            component.getDatatsets();
        });
    }
    getDatatsets(): void {
        this.admin.getDatasets().subscribe(
            (resData) => {
                this.Datasets = resData;
                this.Dt.triggerNext();
            },
            (errorMessage) => {
                this.error = "Undable to fetch the data";
            }
        );
    }

    onSubmit() {
        this.Editmode = false;
        this.admin.getFilteredData(this.filter).subscribe(
            (response) => {
                this.Datasets = response;
                this.Dt.setDtElement(this.dtElement);
                this.Dt.reloadData();
            },
            (errorMessage) => {
                this.error = "Undable to fetch the datasets";
            }
        );
    }

    onCheckboxChange(event) {
        var value = event.target.value;
        var index = this.filter.approved.indexOf(value);
        if (event.target.checked) this.filter.approved.push(value);
        else this.filter.approved.splice(index, 1);
    }

    edit() {
        this.admin
            .updateDatasetDetails(
                this.SelectedDataset._id,
                this.SelectedDataset
            )
            .subscribe(
                (resData) => {
                    this.Editmode = false;
                },
                (errorMessage) => {
                    this.error = "Undable to update the Dataset details";
                }
            );
    }
    delete(id) {
        this.admin.deleteDataset(id).subscribe(
            (resData) => {
                this.onSubmit();
            },
            (errorMessage) => {
                this.error = "Undable to delete the datasets";
            }
        );
        this.Editmode = false;
        this.modal.hide();
    }
}
