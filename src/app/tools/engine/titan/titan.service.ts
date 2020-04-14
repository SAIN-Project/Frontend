import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TitanService {

  url='http://localhost:3000';
 
  constructor(private http: HttpClient) { }
  public runSdsm(data:any):Observable<any>{
    return this.http.post('/engine/titan/sdsm',data);
  }

  public runHdsm(data:any):Observable<any>{
    return this.http.post('/engine/titan/hdsm',data);
  }

  public runBugSpace(data:any):Observable<any>{
    return this.http.post('/engine/titan/bugspace',data);
  }

  public runRootCover(data:any):Observable<any>{
    return this.http.post('/engine/titan/rootcover',data);
  }
}
