import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
@Injectable({
    providedIn: "root",
})
export class RoutingService {
    constructor(public Activerouter: ActivatedRoute, public router: Router) {}
    getRouteParameter(parameter: string) {
        this.Activerouter.params.subscribe((params) => {
            var result = params["id"];
        });
    }
    navigateTo(url: string, params: any = {}) {
        this.router.navigateByUrl(url);
    }
    openWindow(url: string) {
        window.open(url);
    }
}
