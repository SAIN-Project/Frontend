import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpEvent,
    HttpEventType,
    HttpRequest,
    HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";

import { environment } from "../../environments/environment";
@Injectable({
    providedIn: "root",
})
export class HomeService {
    url = environment.ApiUrl;


    constructor(private http: HttpClient) {}
    getArticles(): Observable<any> {
        return this.http.get(this.url + "/home/articles/");
    }
    getArticleByName(title:string):Observable<any>{
        return this.http.get(this.url + "/home/articles/"+title);
    }
}
