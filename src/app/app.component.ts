import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./services/authentication.service";
import { RoutingService } from "./services/routing.service";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: [],
})
export class AppComponent implements OnInit {
    title = "SAIN";
    constructor(
        public auth: AuthenticationService,
        public router: RoutingService
    ) {}
    ngOnInit() {}
}
