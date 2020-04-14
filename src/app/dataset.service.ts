import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  url='http://localhost:3000'
  constructor(private http: HttpClient) { }
  getDatasets():Observable<any>{
    return this.http.get(this.url+'/dataset');
  }
  addDataset(data:any):Observable<any>{
    return this.http.post(this.url+'/dataset/add',data,{
      reportProgress:true,
      observe:'events'
    });
  }
  getFilteredData(filter:any):Observable<any>{
    return this.http.post(this.url+'/dataset/filter',filter)

  }
  downloadDataset(id:string):Observable<any>{
    const url=this.url+'/dataset/download/'+id;
    return this.http.get(url);
  }
}
