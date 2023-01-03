import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpEvent,
    HttpEventType,
    HttpHeaders,
    HttpRequest,
    HttpResponse,
} from "@angular/common/http";

import {RoutingService} from './routing.service'
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { saveAs } from "file-saver";
import * as io from "socket.io-client";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { ProcessStatus } from "../node-editor/Classes/Utility";
import { IO } from "rete";
import { SocketDirective } from "rete-angular-render-plugin/socket.directive";
@Injectable({
    providedIn: "root",
})
export class ReteHttpService {
    
    LocalServer={
        url:"http://localhost:",
        port:3000,
    }
    url:string = environment.ApiUrl;
    socket;
    socketid;
    socketoutput = [];
    public CurrentRuningProcess: ProcessStatus[] = [];
    CompletedProcess = [];
    ValidatorErrors = [];
    nodes = [];
    Timer: string = "";
    ToolEnginesServer = "Remote";
    TerminalStreamingMode:boolean=true;

    constructor(
        public http: HttpClient,
        public router: Router,
        public routerservice:RoutingService
    ) {
        this.setupSocketConnection();
    }
    async setupSocketConnection() {
        await this.socketDisconnect()
        this.socket =  io(this.url)
        this.socket.on("connect", () => {
            this.socketid = this.socket.id;
        });
    }
    async socketDisconnect(){
        if(this.socket) await this.socket.disconnect()
    }
    getChildProcessIndex(id: number) {
        var index = this.CurrentRuningProcess.findIndex(
            (process) => process.id == id
        );
        return index;
    }

    async runToolOnBackend(route, data: any) {
        return await this.http
            .post<any>(this.url + "/engine/" + route, data)
            .toPromise();
    }
    async UploadFileToBackend(
        route,
        data: any,
        onProgress: (p: number) => void
    ): Promise<any> {
        const req = new HttpRequest(
            "POST",
            this.url + "/engine/" + route,
            data,
            {
                reportProgress: true,
            }
        );
        return await this.http
            .request(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event.type !== HttpEventType.UploadProgress) return;
                    const progress = Math.round(
                        (100 * event.loaded) / event.total
                    );
                    onProgress(progress);
                })
            )
            .toPromise();
    }
    async extract(data: any) {
        return await this.http
            .post<any>(this.url + "/engine/extractFile", data)
            .toPromise();
    }

    DownloadFile(data: any) {
        return this.http.post(this.url + "/engine/downloadfile", data, {
            responseType: "blob",
        });
    }
    isEditor(): boolean {
        var url = this.router.url;
        return url == "/editor";
    }

    setNodesList(node, inputs, outputs) {
        var obj = {
            id: node.id,
            name: node.name,
            data: node.data,
            inputs,
            outputs,
            innerhtml: "",
        };
        var index = this.nodes.findIndex((n) => n.id === node.id);
        if (index == -1) this.nodes.push(obj);
        else this.nodes[index] = obj;
    }

    isEmpty(obj: any) {
        return Object.keys(obj).length == 0;
    }

    download(filepath) {
        var data = new FormData();
        if (filepath.length) {
            data.append("File", filepath);
            this.DownloadFile(data).subscribe(
                (resData) => {
                    console.log(resData);
                    var filename = filepath.replace(/^.*[\\\/]/, "");
                    saveAs(resData, filename);
                },
                (err) => {
                    console.error(err);
                    alert("Problem while downloading the file.");
                }
            );
        }
    }

    async isToolExistLocaly(id: string) {
        return await this.http
            .get(this.url + "/engine/isToolExist/" + id)
            .toPromise();
    }
    async downlodToolToDockerContainer(id: string, data) {
        return await this.http
            .post(this.url + "/engine/downloadtool/" + id, data)
            .toPromise();
    }
    setRemoteServer(){
        this.ToolEnginesServer="Remote";
        this.url=environment.ApiUrl;
        this.setupSocketConnection();
    }
    getLocalUrl(){
        return this.LocalServer.url+this.LocalServer.port;
    }
    isLocalServerAlive():Observable<any>{
        return this.http.get(this.getLocalUrl()+"/")
    }
}
