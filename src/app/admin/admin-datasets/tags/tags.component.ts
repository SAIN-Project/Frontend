import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { ModalService } from "../../../services/modal.service";
import { DataTableDirective } from "angular-datatables";
import { DatatableUtil } from "../../../classes/DatatableUtil";
declare var $: any;
@Component({
    selector: "app-tags",
    templateUrl: "./tags.component.html",
    styleUrls: ["../../style.scss"],
})
export class TagsComponent implements OnInit {
    Dt: DatatableUtil = new DatatableUtil();
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;
    DatasetTags: any[] = [];
    private Tagname = "";

    selctedTag = null;
    constructor(private admin: AdminService, private modal: ModalService) {}

    ngOnInit() {
        var component = this;
        $(document).ready(function () {
            component.Dt.setDtElement(component.dtElement);
            component.getTags();
        });
    }
    getTags() {
        this.admin.getDatasetTags().subscribe(
            (res) => {
                this.DatasetTags = res;
                this.Dt.triggerNext();
            },
            (error) => {
                console.log(error);
            }
        );
    }
    addTag() {
        var data = new FormData();
        data.append("key", this.Tagname);
        this.admin.addDatasetTag(data).subscribe(
            (res) => {
                this.DatasetTags = res;
                this.Tagname = "";
                this.modal.hide();
            },
            (err) => {
                console.log(err);
            }
        );
    }
    delete(id: string) {
        this.admin.deleteDatasetTag(id).subscribe(
            (res) => {
                this.DatasetTags = res;
            },
            (err) => {
                console.log(err);
            }
        );
    }
    addTagProperty(value: any) {
        this.selctedTag.values.push(value);
        this.modal.hide();
        this.admin
            .updateDatasetTag(this.selctedTag._id, this.selctedTag)
            .subscribe(
                (res) => {
                    this.DatasetTags = res;
                },
                (err) => {
                    console.log(err);
                }
            );
    }
    deleteTagProperty(item, id: number) {
        this.selctedTag = item;
        this.selctedTag.values.splice(id, 1);
        this.admin
            .updateDatasetTag(this.selctedTag._id, this.selctedTag)
            .subscribe(
                (res) => {
                    this.DatasetTags = res;
                    this.Dt.setDtElement(this.Dt.dtElement);
                    this.Dt.triggerNext();
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
