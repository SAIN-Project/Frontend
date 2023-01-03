import { Component, OnInit,ViewChild,ElementRef } from "@angular/core";
import { HomeService } from "../../../services/home.service";
import { RendererService } from "../../../services/renderer.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-articles-detail",
    templateUrl: "./articles-detail.component.html",
    styleUrls: ["../../style.scss"],
})
export class ArticlesDetailComponent implements OnInit {
    title: string = "";
    Article: any = null;
    @ViewChild("el", { static: true }) el: ElementRef;
    constructor(
        public home: HomeService,
        public Activerouter: ActivatedRoute,
        public renderer: RendererService
    ) {}

    async ngOnInit() {
        this.title = await this.Activerouter.snapshot.params["name"];
        this.getArticle();
    }
    getArticle(): any {
        this.home.getArticleByName(this.title).subscribe((response) => {
            this.Article = response;
            console.log(this.Article)
            var data = this.renderer.parseCkEditorContents(
                this.Article.contents
            );
            this.renderer.renderContents(this.el, data);
        });
    }
}
