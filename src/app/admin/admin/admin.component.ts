import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
declare var $: any;
@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
    constructor(private auth: AuthenticationService) {}

    ngOnInit() {
        $(document).ready(function () {
            $("#sidebarCollapse").on("click", function () {
                $(".sidebar").toggleClass("active");
                $(this).toggleClass("active");
            });
            $("nav ul li").click(function () {
                $(this).addClass("active").siblings().removeClass("active");
            });
        });
    }
}
