import { Injectable } from '@angular/core';
import{saveAs} from'file-saver'
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Subject, Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FileDownloadUploadService {
  url=environment.ApiUrl;
  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();
  constructor(private http:HttpClient) { }
  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
  DownloadFile(filepath:any){
    var data={File:filepath};
    this.http.post(this.url+'/engine/downloadfile',data,{
      responseType : 'blob',
    }).subscribe(response=>{
      var filename = filepath.replace(/^.*[\\\/]/, '')
      saveAs(response, filename);
    })
  }
  DownloadComponent(id:any){

    window.location.href=this.url+'/tool/download/'+id
  }
  DownloadDataset(id:any){
    window.location.href=this.url+'/dataset/download/'+id
  }
  DownloadDataFile(id:any){
    window.location.href=this.url+'/files/download/'+id
  }
  getDataFiles(id:string):Observable<any>{
    return this.http.get(this.url+'/files/files/'+id)
  }
  deleteDataFile(id){
    return this.http.delete(this.url+'/files/delete/'+id)
  }
  getDirctoryFiles(dir:string):Observable<any>{
    return this.http.post(this.url+'/files/getAllFilesInDirectory',{dir})
  }
}
