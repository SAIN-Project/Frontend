import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  url='http://localhost:3000'
  constructor(private http: HttpClient) { }
  getTools():Observable<any>{
    return this.http.get(this.url+'/tools');
  }

  addTool(data:any):Observable<any>{
    return this.http.post(this.url+'/tools/add',data,{
      reportProgress:true,
      observe:'events'
    });
  }
  getFilteredTools(filter:any):Observable<any>{
    return this.http.post(this.url+'/tools/filter',filter)
  }
}
