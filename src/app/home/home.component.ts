import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { ReteHttpService } from "../services/rete-http.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
    constructor(
        public auth: AuthenticationService,
        public retehttp: ReteHttpService
    ) {}

    ngOnInit() {}
}
