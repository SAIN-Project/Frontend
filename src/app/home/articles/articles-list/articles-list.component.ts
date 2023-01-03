import { Component, OnInit } from "@angular/core";
import { HomeService } from "../../../services/home.service";
@Component({
    selector: "app-articles-list",
    templateUrl: "./articles-list.component.html",
    styleUrls: ["../../style.scss"],
})
export class ArticlesListComponent implements OnInit {
    Articles=[];
    SearchTerm:string="";
    constructor(public HomeService: HomeService) {}

    ngOnInit(): void {
        this.HomeService.getArticles().subscribe((response)=>{
            this.Articles=response;
        })
    }
    filterArticles(event){
        var data={name:event.target.value}
        this.Articles=[];
        this.HomeService.searchArticlesByTitle(data).subscribe((response)=>{
            this.Articles=response;
        })
    }
}
