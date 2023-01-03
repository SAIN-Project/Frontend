import { Component, OnInit, Input, Output } from "@angular/core";
import { AdminService } from "../../../services/admin.service";
import { RoutingService } from "../../../services/routing.service";
import { ModalService } from "../../../services/modal.service";

class Article {
    title: string = "";
    contents: string = "";
}
@Component({
    selector: "app-articles",
    templateUrl: "./templates/articles.component.html",
    styleUrls: ["../../style.scss"],
})
export class ArticlesComponent implements OnInit {
    Articles: any[] = [];
    Article: Article = new Article();
    SelectedArticle = null;
    view = "Articles";
    constructor(
        public admin: AdminService, 
        public modal: ModalService,
        public router:RoutingService
    ) {}

    ngOnInit() {
        this.getArticles();
    }
    getArticles() {
        this.admin.getArticles().subscribe(
            (response) => {
                this.Articles = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    delete(id: string) {
        this.admin.deleteArticles(id).subscribe((response) => {
            this.Articles = response;
            this.modal.hide();
        });
    }
}

