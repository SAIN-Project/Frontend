import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { ModalService } from "../../../services/modal.service";

@Component({
    selector: "app-filters",
    templateUrl: "./filters.component.html",
    styleUrls: ["../../style.scss"],
})
export class FiltersComponent implements OnInit {
    public Categories: any = [];
    public categoryname = "";
    selctedCategory = null;

    constructor(public admin: AdminService, public modal: ModalService) {}
    ngOnInit() {
        this.admin.getToolFilters().subscribe(
            (res) => {
                this.Categories = res;
            },
            (error) => {
                console.log("error");
            }
        );
    }

    addCategory() {
        var data = new FormData();
        data.append("key", this.categoryname);
        this.admin.addToolCategory(data).subscribe(
            (res) => {
                this.Categories = res;
                this.categoryname = "";
                this.modal.hide();
            },
            (err) => {
                console.log(err);
            }
        );
    }
    delete(id: string) {
        this.admin.deleteToolCategory(id).subscribe(
            (res) => {
                this.Categories = res;
            },
            (err) => {
                console.log(err);
            }
        );
    }
    addCategoryProperty(value: any) {
        this.selctedCategory.values.push(value);
        this.modal.hide();
        this.admin
            .updateToolCategory(this.selctedCategory._id, this.selctedCategory)
            .subscribe(
                (res) => {
                    this.Categories = res;
                },
                (err) => {
                    console.log(err);
                }
            );
    }
    deleteCategoryProperty(item, id: number) {
        this.selctedCategory = item;
        this.selctedCategory.values.splice(id, 1);
        this.admin
            .updateToolCategory(this.selctedCategory._id, this.selctedCategory)
            .subscribe(
                (res) => {
                    this.Categories = res;
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
