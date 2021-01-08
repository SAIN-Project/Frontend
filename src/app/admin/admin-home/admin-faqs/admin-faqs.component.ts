import { Component, OnInit, Input, Output } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { RoutingService } from "../../../services/routing.service";
import { ModalService } from "../../../services/modal.service";

class Faq {
    title: string = "";
    contents: string = "";
}
@Component({
    selector: "app-admin-faqs",
    templateUrl: "./templates/admin-faqs.component.html",
    styleUrls: ["../../style.scss"],
})
export class AdminFaqsComponent implements OnInit {
    Faqs: any[] = [];
    Faq: Faq = new Faq();
    SelectedFaq = null;
    view = "faqs";
    constructor(private admin: AdminService, private modal: ModalService) {}

    ngOnInit() {
        this.getFaqs();
    }
    getFaqs() {
        this.admin.getFaqs().subscribe((response) => {
            this.Faqs = response;
        });
    }
    submit() {
        this.admin.addFqas(this.Faq).subscribe((response) => {
            this.Faqs = response;
            this.view = "faqs";
            this.Faq = new Faq();
        });
    }
    delete(id: string) {
        this.admin.deleteFaq(id).subscribe((response) => {
            this.Faqs = response;
            this.modal.hide();
        });
    }
    edit() {
        this.Faqs = [];
        this.admin
            .updateFaqs(this.SelectedFaq._id, this.SelectedFaq)
            .subscribe((response) => {
                this.Faqs = response;
                this.view = "faqs";
            });
    }
}

@Component({
    selector: "app-new-faqs",
    templateUrl: "./templates/new-faqs.html",
    styleUrls: ["../../style.scss"],
})
export class AdminNewFaqsComponent implements OnInit {
    @Input() Faq;
    constructor(private admin: AdminService, private router: RoutingService) {}

    ngOnInit() {}
    updateContent($event) {
        this.Faq.contents = $event;
    }
}
