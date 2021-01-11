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
    constructor(private admin: AdminService, private modal: ModalService) {}

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
    submit() {
        this.admin.addArticles(this.Article).subscribe((response) => {
            this.Articles = response;
            this.view = "Articles";
            this.Article = new Article();
        });
    }
    delete(id: string) {
        this.admin.deleteArticles(id).subscribe((response) => {
            this.Articles = response;
            this.modal.hide();
        });
    }
    edit() {
        this.Articles = [];
        this.admin
            .updateArticles(this.SelectedArticle._id, this.SelectedArticle)
            .subscribe((response) => {
                this.Articles = response;
                this.view = "Articles";
            });
    }
}
@Component({
    selector: "app-new-Articles",
    templateUrl: "./templates/new-articles.html",
    styleUrls: ["../../style.scss"],
})
export class AdminNewArticlesComponent implements OnInit {
    @Input() Article: Article;
    constructor(private admin: AdminService, private router: RoutingService) {}

    ngOnInit() {}
    updateContent($event) {
        this.Article.contents = $event;
    }
}
