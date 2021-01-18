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
    getArticleById(id:string):Observable<any>{
        return this.http.get(this.url + "/home/articlesById/"+id);
    }
    searchArticlesByTitle(data:any):Observable<any>{
        return this.http.post(this.url + "/home/articles/filter",data)
    }
    getFaqs(): Observable<any> {
        return this.http.get(this.url + "/home/faqs/");
    }
    addArticles(data: any): Observable<any> {
        return this.http.post(this.url + "/home/articles/", data);
    }
    updateArticles(id: string, data: any): Observable<any> {
        return this.http.post(this.url + "/home/articles/update/" + id, data);
    }
}
