import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../services/authentication.service";
@Component({
    selector: "admin-top-header",
    templateUrl: "./templates/topheader.component.html",
    styleUrls: ["../admin.component.scss"],
})
export class AdminTopHeader implements OnInit {
    constructor(public auth: AuthenticationService) {}

    ngOnInit() {}
}

@Component({
    selector: "admin-side-header",
    templateUrl: "./templates/sideheader.component.html",
    styleUrls: ["../admin.component.scss"],
})
export class AdminSideHeader implements OnInit {
    constructor() {}

    ngOnInit() {}
}
