import { Component, OnInit } from "@angular/core";
import {HomeService} from "../../services/home.service"
@Component({
    selector: "app-frequently-asked-questions",
    templateUrl: "./frequently-asked-questions.component.html",
    styleUrls: ["../style.scss"],
})
export class FrequentlyAskedQuestionsComponent implements OnInit {
    Faqs=[];
    constructor( public HomeService:HomeService) {}

    ngOnInit(): void {
        this.HomeService.getFaqs().subscribe((response)=>{
            this.Faqs=response;

        })
    }
}
