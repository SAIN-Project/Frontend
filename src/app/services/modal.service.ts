import { Injectable } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Injectable({
    providedIn: "root",
})
export class ModalService {
    modalRef: BsModalRef;
    modalservice: BsModalService;

    constructor(private modalService: BsModalService) {
        this.modalservice = modalService;
    }
    open(template: any, classes = "modal-lg") {
        this.modalRef = this.modalService.show(template, {
            class: classes,
            backdrop: "static",
            animated: true,
            keyboard: false,
            ignoreBackdropClick: true,
        });
    }
    hide() {
        this.modalRef.hide();
    }
}
