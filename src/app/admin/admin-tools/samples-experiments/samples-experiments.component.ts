import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalService } from "../../../services/modal.service";
import { AdminService } from "../../../services/admin.service";
import { DataTableDirective } from "angular-datatables";
import { DatatableUtil } from "../../../classes/DatatableUtil";
@Component({
    selector: "app-samples-experiments",
    templateUrl: "./samples-experiments.component.html",
    styleUrls: ["../../style.scss"],
})
export class SamplesExperimentsComponent implements OnInit {
    Dt: DatatableUtil = new DatatableUtil();
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    public Samples: any = [];
    sample = {
        name: "",
        file: new File([""], "", { type: "" }),
        contents: "",
    };
    constructor(public modal: ModalService, public admin: AdminService) {}

    ngOnInit() {
        this.admin.getSamples().subscribe(
            (res) => {
                this.Samples = res;
                this.Dt.triggerNext();
            },
            (error) => {
                console.log("error");
            }
        );
    }
    submit() {
        var data = new FormData();
        data.append("name", this.sample.name);
        data.append("contents", this.sample.contents);
        this.admin.addSample(data).subscribe(
            (res) => {
                this.Samples = res;
                this.sample.name = "";
                this.sample.file = new File([""], "", { type: "" });
                this.modal.hide();
                this.Dt.setDtElement(this.dtElement);
                this.Dt.reloadData();
                console.log(this.Samples);
            },
            (err) => {
                console.log(err);
            }
        );
    }
    onFileSelected(event) {
        if (event.target.files.length > 0) {
            this.sample.file = <File>event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(this.sample.file, "UTF-8");
            fileReader.onloadend = () => {
                this.sample.contents = <string>fileReader.result;
            };
            fileReader.onerror = (error) => {
                console.log(error);
            };
        }
    }
    deleteSample(id: string) {
        this.admin.deleteSample(id).subscribe(
            (res) => {
                this.Samples = res;
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
