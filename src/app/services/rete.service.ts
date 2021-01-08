import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
@Injectable({
    providedIn: "root",
})
export class ReteService {
    url = environment.ApiUrl;
    constructor(private http: HttpClient) {}
    //=========================================================//
    async getRetes() {
        return await this.http.get<any>(this.url + "/rete/retes/").toPromise();
    }
    async getCategoryList() {
        return await this.http
            .get<any>(this.url + "/admin/filters/")
            .toPromise();
    }
    addRete(data: any) {
        return this.http.post(this.url + "/rete/retes/", data);
    }
    getComponentRete(id: string) {
        return this.http.get(this.url + "/rete/componentrete/" + id);
    }
    deleteRete(id: string) {
        return this.http.delete(this.url + "/rete/retes/delete/" + id);
    }
    getReteById(id: string) {
        return this.http.get(this.url + "/rete/retes/" + id);
    }
    getReteByName(name: string): Observable<any> {
        return this.http.get(this.url + "/rete/retebyname/" + name);
    }

    updateRete(id: string, data) {
        return this.http.post(this.url + "/rete/retes/update/" + id, data);
    }
    async getSocketsNames() {
        return await this.http
            .get<any>(this.url + "/rete/socketnames/")
            .toPromise();
    }
    async getComponentDependency(data) {
        return await this.http
            .post<any>(this.url + "/rete/dependency/", data)
            .toPromise();
    }
}
