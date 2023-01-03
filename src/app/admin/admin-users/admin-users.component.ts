import { Component, OnInit, ViewChild } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { ModalService } from "../../services/modal.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatatableUtil } from "../../classes/DatatableUtil";
class filter {
    firstname: string = "";
    lastname: string = "";
    username: string = "";
    approved: string[] = [];
    role: string[] = [];
}
@Component({
    selector: "app-admin-users",
    templateUrl: "./admin-users.component.html",
    styleUrls: ["../style.scss"],
})
export class AdminUsersComponent implements OnInit {
    Dt: DatatableUtil = new DatatableUtil();
    @ViewChild(DataTableDirective, { static: false })
    dtElement: DataTableDirective;

    filter: filter = new filter();

    Users: any[] = [];
    error = null;
    SelectedUser = null;
    Approved = null;
    Editmode = false;
    constructor(public admin: AdminService, public modal: ModalService) {}

    ngOnInit() {
        this.Dt = new DatatableUtil();
        this.getUsers();
    }

    getUsers(): void {
        this.admin.getUsers().subscribe(
            (response) => {
                this.Users = response;
                this.Dt.triggerNext();
            },
            (errorMessage) => {
                this.error = "Undable to fetch the Users";
            }
        );
    }

    async onSubmit() {
        this.Editmode = false;
        const data = new FormData();
        data.append("firstname", this.filter.firstname),
            data.append("lastname", this.filter.lastname),
            data.append("Approved", JSON.stringify(this.filter.approved));
        data.append("Role", JSON.stringify(this.filter.role));
        data.append("email", this.filter.username);

        this.admin.getFilteredUsers(data).subscribe(
            (resData) => {
                this.Users = resData;
                this.Dt.setDtElement(this.dtElement);
                this.Dt.reloadData();
            },
            (errorMessage) => {
                this.error = "Undable to fetch the Users";
            }
        );
    }

    onCheckboxChange(event, target) {
        var value = event.target.value;
        var index = target.indexOf(value);
        if (event.target.checked) target.push(value);
        else target.splice(index, 1);
    }

    edit(id) {
        this.admin.updateUserDetails(id, this.SelectedUser).subscribe(
            (response) => {},
            (errorMessage) => {
                this.error = "Undable to update the user details";
            }
        );
        this.onSubmit();
        this.Editmode = false;
    }

    delete(id) {
        this.admin.deleteUser(id).subscribe(
            (resData) => {},
            (errorMessage) => {
                this.error = "Undable to delete the User";
            }
        );
        this.modal.hide();
        this.onSubmit();
    }
}
