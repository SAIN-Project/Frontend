import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ArcheiService {

  url='http://localhost:3000'
  constructor(private http: HttpClient) { }
  runArchei(data):Observable<any>{
    return this.http.post('/engine/Archi',data);
  }
}
