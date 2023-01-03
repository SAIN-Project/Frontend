import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Tool } from "../classes/tool";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
@Injectable({
    providedIn: "root",
})
export class ToolService {
    public notify = new Subject<any>();
    notifyObservable$ = this.notify.asObservable();

    Categories: any[] = [];
    url = environment.ApiUrl;
    constructor(public http: HttpClient) {
        this.geCategories();
    }

    getComponents(): Observable<any> {
        return this.http.get(this.url + "/tool/components");
    }
    getMyTools(): Observable<any> {
        return this.http.get(this.url + "/tool/mycomponents");
    }

    getFilteredTools(filter: any): Observable<any> {
        return this.http.post(this.url + "/tool/filter", filter);
    }

    addToolComponent(data: any): Observable<HttpEvent<any>> {
        const req = new HttpRequest(
            "POST",
            this.url + "/tool/addcomponents/",
            data,
            {
                reportProgress: true,
                responseType: "json",
            }
        );
        return this.http.request(req);
    }
    updateToolComponent(id: string, data: any): Observable<any> {
        const req = new HttpRequest(
            "POST",
            this.url + "/tool/updatecomponent/" + id,
            data,
            {
                reportProgress: true,
                responseType: "json",
            }
        );
        return this.http.request(req);
    }
    deleteToolComponent(id: string): Observable<any> {
        return this.http.delete(this.url + "/tool/deletecomponent/" + id);
    }

    getToolComponentByName(name: string): Observable<any> {
        return this.http.get(this.url + "/tool/getcomponentByName/" + name);
    }
    getToolComponentById(id: string): Observable<any> {
        return this.http.get(this.url + "/tool/getcomponentById/" + id);
    }
    geCategories() {
        this.http.get(this.url + "/admin/filters/").subscribe(
            (response) => {
                this.Categories = <Array<any>>response;
                this.notify.next({
                    category: "Categories fetched successfuly",
                });
            },
            (error) => {
                console.log("Error");
            }
        );
    }

    getSamples() {
        return this.http.get(this.url + "/admin/samples/");
    }

    getready2runSamples() {
        return this.http.get(this.url + "/admin/ready2runsamples/");
    }
        
    //=========================================================//

    async getCategoryList() {
        return await this.http
            .get<any>(this.url + "/admin/filters/")
            .toPromise();
    }
}
