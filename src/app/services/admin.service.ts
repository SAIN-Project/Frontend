import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Injectable({
    providedIn: "root",
})
export class AdminService {
    url = environment.ApiUrl;
    constructor(private http: HttpClient) {}
    getUsers(): Observable<any> {
        return this.http.get(this.url + "/admin/users");
    }
    getTools(): Observable<any> {
        return this.http.get(this.url + "/admin/components");
    }
    getDatasets(): Observable<any> {
        return this.http.get(this.url + "/admin/datasets");
    }
    getFilteredData(filter: any): Observable<any> {
        return this.http.post(this.url + "/admin/filterdata", filter);
    }
    getFilteredTools(filter: any): Observable<any> {
        return this.http.post(this.url + "/admin/filtertools", filter);
    }

    getFilteredUsers(filter: any): Observable<any> {
        return this.http.post(this.url + "/admin/filterusers", filter);
    }
    deleteDataset(id: any): Observable<any> {
        return this.http.delete(this.url + "/admin/deletedataset/" + id);
    }

    deleteComponent(id: any): Observable<any> {
        return this.http.delete(this.url + "/admin/deletecomponent/" + id);
    }
    deleteUser(id: any): Observable<any> {
        return this.http.delete(this.url + "/admin/deleteuser/" + id);
    }
    updateUserDetails(id: any, user: any): Observable<any> {
        return this.http.post(this.url + "/admin/updateuser/" + id, user);
    }

    updateDatasetDetails(id: any, dataset: any): Observable<any> {
        return this.http.post(this.url + "/admin/updatedataset/" + id, dataset);
    }
    updateToolDetails(id: any, tool: any): Observable<any> {
        return this.http.post(this.url + "/admin/updatetool/" + id, tool);
    }
    updateComponentDetails(id: any, component: any): Observable<any> {
        return this.http.post(
            this.url + "/admin/updatecomponent/" + id,
            component
        );
    }
    getToolComponent(id: string): Observable<any> {
        return this.http.get(this.url + "/tool/getcomponents/" + id);
    }
    getToolDetails(id: any): Observable<any> {
        return this.http.get(this.url + "/tool/details/" + id);
    }
    getToolFilters() {
        return this.http.get(this.url + "/admin/filters/");
    }
    addToolCategory(data: any): Observable<any> {
        return this.http.post(this.url + "/admin/filters/", data);
    }
    deleteToolCategory(id: any): Observable<any> {
        return this.http.delete(this.url + "/admin/filters/delete/" + id);
    }
    updateToolCategory(id: string, category: any) {
        return this.http.post(
            this.url + "/admin/filters/update/" + id,
            category
        );
    }
    getSamples() {
        return this.http.get(this.url + "/admin/samples/");
    }
    addSample(data: any): Observable<any> {
        return this.http.post(this.url + "/admin/samples/", data);
    }
    deleteSample(id: any): Observable<any> {
        return this.http.delete(this.url + "/admin/samples/delete/" + id);
    }

    getDatasetFilters() {
        return this.http.get(this.url + "/admin/datasetfilters/");
    }
    addDatasetCategory(data: any): Observable<any> {
        return this.http.post(this.url + "/admin/datasetfilters/", data);
    }
    deleteDatasetCategory(id: any): Observable<any> {
        return this.http.delete(
            this.url + "/admin/datasetfilters/delete/" + id
        );
    }
    updateDatasetCategory(id: string, category: any) {
        return this.http.post(
            this.url + "/admin/datasetfilters/update/" + id,
            category
        );
    }

    getDatasetTags(): Observable<any> {
        return this.http.get(this.url + "/admin/datasettags/");
    }
    addDatasetTag(data: any): Observable<any> {
        return this.http.post(this.url + "/admin/datasettags/", data);
    }
    deleteDatasetTag(id: any): Observable<any> {
        return this.http.delete(this.url + "/admin/datasettags/delete/" + id);
    }
    updateDatasetTag(id: string, tag: any): Observable<any> {
        return this.http.post(
            this.url + "/admin/datasettags/update/" + id,
            tag
        );
    }
    getFaqs(): Observable<any> {
        return this.http.get(this.url + "/home/faqs/");
    }
    addFqas(data: any): Observable<any> {
        return this.http.post(this.url + "/home/faqs/", data);
    }
    updateFaqs(id: string, tag: any): Observable<any> {
        return this.http.post(this.url + "/home/faqs/update/" + id, tag);
    }
    deleteFaq(id: any): Observable<any> {
        return this.http.delete(this.url + "/home/faqs/delete/" + id);
    }
}
