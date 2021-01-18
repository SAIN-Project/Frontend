import { Component, OnInit } from "@angular/core";
import { RoutingService } from "../../../services/routing.service";
import { HomeService } from "../../../services/home.service";
import { ActivatedRoute } from "@angular/router";
class Article {
    name: string = "";
    description:string="";
    contents: string = "";
}
@Component({
    selector: "app-new-article",
    templateUrl: "./new-article.component.html",
    styleUrls: ["./new-article.component.css"],
})
export class NewArticleComponent implements OnInit {
    Article:Article=new Article();
    constructor(
        private HomeService:HomeService,
        private Router:RoutingService
    ) {}

    ngOnInit(): void {}

    submit(){
        this.HomeService.addArticles(this.Article).subscribe((response) => {
            this.Router.navigateTo('/tutorials/'+this.Article.name)
        });
    }
    updateContent(event){
        this.Article.contents=event;
    }
}

@Component({
    selector: "app-edit-article",
    templateUrl: "./new-article.component.html",
    styleUrls: ["./new-article.component.css"],
})
export class EditArticleComponent implements OnInit {
    Article:Article=new Article();
    _id:string=null;
    constructor(
        private HomeService:HomeService, 
        private Router:RoutingService,
        private Activeroute:ActivatedRoute  
    ) {}

    async ngOnInit(){
        this._id=await this.Activeroute.snapshot.params["id"];
        this.HomeService.getArticleById(this._id).subscribe((response)=>{
            this.Article=response;
        })
    }

    submit(){
        this.HomeService.updateArticles(this._id,this.Article).subscribe((response) => {
            this.Router.navigateTo('/tutorials/'+this.Article.name)
        });
    }
    updateContent(event){
        this.Article.contents=event;
    }
}
