import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
    selector: "app-header-one",
    templateUrl: "./templates/header-one.component.html",
    styleUrls: ["./header.scss"],
})
export class HeaderOneComponent implements OnInit {
    constructor(public auth: AuthenticationService) {}

    ngOnInit() {}
}
@Component({
    selector: "app-header-two",
    templateUrl: "./templates/header-two.component.html",
    styleUrls: ["./header.scss"],
})
export class HeaderTwoComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}

@Component({
    selector: "app-header-three",
    templateUrl: "./templates/header-three.component.html",
    styleUrls: ["./header.scss"],
})
export class HeaderThreeComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}

@Component({
    selector: "app-footer",
    templateUrl: "./templates/footer.component.html",
    styleUrls: ["./header.scss"],
})
export class FooterComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
