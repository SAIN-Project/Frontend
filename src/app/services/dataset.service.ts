import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class DatasetService {
    url = environment.ApiUrl;
    Categories: any = null;
    constructor(public http: HttpClient) {}

    geCategories() {
        this.http.get(this.url + "/admin/datasetfilters/").subscribe(
            (response) => {
                this.Categories = response;
            },
            (error) => {
                console.log("Error");
            }
        );
    }
    getDatasets(): Observable<any> {
        return this.http.get(this.url + "/dataset");
    }
    getMyDatasets(): Observable<any> {
        return this.http.get(this.url + "/dataset/mydatasets");
    }
    addDataset(data: any): Observable<HttpEvent<any>> {
        const req = new HttpRequest("POST", this.url + "/dataset/add", data, {
            reportProgress: true,
            responseType: "json",
        });
        return this.http.request(req);
    }
    editDataset(id: string, data: any): Observable<HttpEvent<any>> {
        const req = new HttpRequest(
            "POST",
            this.url + "/dataset/update/" + id,
            data,
            {
                reportProgress: true,
                responseType: "json",
            }
        );
        return this.http.request(req);
    }
    getDatasetDetails(id: any): Observable<any> {
        return this.http.get(this.url + "/dataset/details/" + id);
    }

    deleteDataset(id: string): Observable<any> {
        return this.http.delete(this.url + "/dataset/delete/" + id);
    }
    getFilteredData(filter: any): Observable<any> {
        return this.http.post(this.url + "/dataset/filter", filter);
    }
    getFilteredDataByTag(tag: string): Observable<any> {
        return this.http.get(this.url + "/dataset/filter/" + tag);
    }

    getDatasetTags() {
        return this.http.get(this.url + "/admin/datasettags/");
    }
    getDatasetFiles(id: string): Observable<any> {
        return this.http.get(this.url + "/dataset/datasetfiles/" + id);
    }
    deleteDatasetFile(id) {
        return this.http.delete(this.url + "/dataset/deletefile/" + id);
    }
}
