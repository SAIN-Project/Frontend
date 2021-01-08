import { saveAs } from 'file-saver'
import { Component, Input, Output, Node, Socket, Engine } from 'rete';
import { Controls } from '../Controls/Control'
import { TextControl } from '../Controls/text-input/text-input.component';
import { FileControl } from '../Controls/file-input/file-input.component'
import { SliderControl } from '../Controls/slider-input/slider-input.component'
import { SingleCheckboxControl } from '../Controls/single-checkbox/single-checkbox.component'
import { DropDownControl } from '../Controls/dropd-down-input/drop-down-input.component'
import { AngularComponent, AngularComponentData } from 'rete-angular-render-plugin';
import { MyNodeComponent,MyNodeDependencyComponent } from '../Nodes/node/node.component';
import { ReteHttpService } from '../../services/rete-http.service'
import { ReteComponent } from '../../classes/component'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ProcessStatus } from './Utility'
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

interface CustomSocket {
    name: string;
    socket: Socket;
};
const FileUploaderSocket = new Socket("File Upload");
export class SocketManagment {
    static sockets: CustomSocket[] = [
        { name: 'File Upload', socket: new Socket('File Upload') },
        { name: 'File Upload', socket: new Socket('File Upload') },
    ];
    static createSocket(name: string) {
        var index = this.sockets.findIndex(s => s.name == name);
        var socket: Socket = null;
        if (index == -1) {
            socket = new Socket(name)
            this.sockets.push({ name: name, socket: socket })
            return socket;
        } else {
            return this.findSocket(name)
        }
    }
    static findSocket(name: string): Socket {
        var index = this.sockets.findIndex(s => s.name == name);
        if (index != -1) return this.sockets[index].socket;
        else return null;
    }
    static combineSockets(socket: Socket, sockets: string[]) {
        for (var s of sockets) {
            var MatchedSocket = this.findSocket(s);
            MatchedSocket.combineWith(socket)
        }
    }
}

export class Validator {
    constructor(private http: ReteHttpService) { }
    validate(node: Node) {
        this.Inputs(node);
        this.Controls(node);
    }
    Controls(node: Node) {
        node.controls.forEach(c => {
            var error = this.validateControl(node.name, <Controls>c);
            if (error) this.http.ValidatorErrors.push(error);
        })
    }
    validateControl(nodename: string, ctrl: Controls): any {
        var result = ctrl.validate()
        if (!result.isValid) {
            return { node: nodename, control: ctrl.key, message: result.message }
        }
        return null;
    }
    Inputs(node: Node) {
        node.inputs.forEach(input => {
            var ctrlerror = this.validateControl(node.name, <Controls>input.control)
            var inputerror = this.validateInputs(input);
            if (ctrlerror && inputerror) {
                this.http.ValidatorErrors.push(ctrlerror)
            }
        })
    }
    validateInputs(input: Input) {
        return (input.connections.length == 0)
    }
}

class Util {
    public Engine: Engine;
    public Http: ReteHttpService;
    public Node: Node;
    public Inputs: Input;
    public Outputs: Output;
    public Formdata: FormData;
    public ProcessStatus: ProcessStatus;
    constructor(http, engine, node, inputs, outputs) {
        this.Http = http;
        this.Engine = engine;
        this.Node = node;
        this.Inputs = inputs;
        this.Outputs = outputs;
        this.Formdata = new FormData();
        this.ProcessStatus = new ProcessStatus(this.Node.id);
        this.Http.CurrentRuningProcess.push(this.ProcessStatus);
    }
    async Abort() {
        await this.Engine.abort();
    }
    async isToolExistLocaly(id:string){
        var response:any=await this.Http.isToolExistLocaly(id)
        if(response.isToolExist==false){
            this.Http.socket.on('progress', (data: string) => {
                this.ProcessStatus.setCloningStatus(data)
                
            })
            var data={
                id:id,
                filepath:response.filepath,
                socketid:this.Http.socketid
            }
            var downloadresult=await this.Http.downlodToolToDockerContainer(id,data)
            this.ProcessStatus.removeStatus();
            console.log(downloadresult)
        }
    }
    hasInputs(): boolean {
        return this.Node.inputs.size != 0;
    }
    inputHasProperty(property) {
        if (this.Inputs[property]) return this.Inputs[property].length;
        return false;
    }
    async uploadFiles(property, title) {
        var filepath = null;
        if (this.hasInputs() && this.inputHasProperty(property)) {
            if (this.Inputs[property][0] != "") {
                this.Formdata.set(property, this.Inputs[property][0]);
                return;
            }
        }
        if (this.Node.data[property] instanceof File) {
            var file = <File>this.Node.data[property];
            var data = new FormData();
            data.set("File", file, file.name);
            data.set("socketid", this.Http.socketid);
            this.ProcessStatus.setStatusWithProgress(file.name, 0);
            var response = await this.Http.UploadFileToBackend("FileUploader",data,
                (progress) => {
                    this.ProcessStatus.setStatusWithProgress(file.name, progress);
                    if (progress == 100)
                        this.ProcessStatus.setStatusExtracting(file.name);
                }
            );
            this.ProcessStatus.removeStatus();
            if (response instanceof HttpResponse) {
                var body = response.body;
                if (body.OutputFilePath)
                    this.Formdata.set(property, body.OutputFilePath);
                else {
                    this.Abort();
                    alert(body.error);
                }
            } else {
                this.Abort();
                alert("Backend Server is Down");
            }
        } else {
            //from Datasets
            var filevalue = <Object>this.Node.data[property];

            if (filevalue["filepath"].endsWith(".zip") == false)
                this.Formdata.set(property, filevalue["filepath"]);
            else {
                this.ProcessStatus.setStatusExtracting(filevalue["filename"]);
                var data = new FormData();
                data.set("filepath", filevalue["filepath"]);
                await this.Http.extract(data)
                    .then(
                        (response) => {
                            this.Formdata.set(property, response.OutputFilePath);
                        },
                        (error) => {
                            this.Abort();
                            alert(error.error);
                        }
                    )
                    .catch((e) => {
                        this.Abort();
                        alert("Backend Server is Down");
                    })
                    .finally(() => {
                        this.ProcessStatus.removeStatus();
                    });
            }
        }
    }

    async appendData(properties) {
        for (var property of properties)
            this.Formdata.set(property, <string>this.Node.data[property]);
    }
    async runOnTheBackend(router, output_property) {
        this.ProcessStatus.setStatusExecutingTool(this.Node.name);
        this.Formdata.set("socketid", this.Http.socketid);
        this.Http.setNodesList(this.Node, this.Inputs, this.Outputs);
        await this.Http.runToolOnBackend(router, this.Formdata)
            .then(
                (response) => {
                    this.Outputs[output_property] = response.OutputFilePath;
                },
                (error)=>{
                    alert(error.error.error);
                    return;
                }
            )
            .catch((error) => {
                alert('here')
                this.Abort();
                if (error.error) alert(error.error);
                else alert("HttpError:The Backend Server is down ..");
            });
        this.ProcessStatus.removeStatus();
        this.Http.CompletedProcess.push(this.Node.id);
        var index = this.Http.CurrentRuningProcess.findIndex(
            (process) => process.id == this.Node.id
        );
        this.Http.CurrentRuningProcess.splice(index, 1);
    }
}
export class FileUploader extends Component implements AngularComponent {
    data: AngularComponentData;
    path = ["Utilities"];
    ProcessStatus:ProcessStatus
    constructor(private http: ReteHttpService) {
        super("File Upload");
        this.data.render = "angular";
        this.data.component = MyNodeComponent;
        this.ProcessStatus;
    }
    async builder(node) {
        return node
        .addControl( new FileControl(this.editor, "Project", "Upload Project (.zip)"))
        .addOutput(new Output("filepath","Output",SocketManagment.findSocket("File Upload")));
    }
    async worker(node, inputs, outputs) {
        this.ProcessStatus=new ProcessStatus(node.id)
        this.http.CurrentRuningProcess.push(this.ProcessStatus);
        this.http.setNodesList(node, inputs, outputs);
        const project = <File>node.data.Project;
        var data = new FormData();
        data.set("socketid", this.http.socketid);
        data.set("File", project, project.name);
        var response = await this.http.UploadFileToBackend("FileUploader",data,
            (progress) => {
                this.ProcessStatus.setStatusWithProgress(project.name,progress)
                if(progress==100) this.ProcessStatus.setStatusExtracting(project.name)
            }
        );
        if (response instanceof HttpResponse) {
            var body = response.body;
            if (body.OutputFilePath) outputs["filepath"] = body.OutputFilePath;
            else {
                this.engine.abort();
                alert(body.error);
                return;
            }
        } else {
            this.engine.abort();
            alert("Backend Server is Down");
            return;
        }
        this.http.CompletedProcess.push(node.id);
        var index = this.http.CurrentRuningProcess.findIndex(
          (process) => process.id == node.id
        );
        this.http.CurrentRuningProcess.splice(index, 1);
    }
}
export class ProjectFilePath extends Component implements AngularComponent {
    data: AngularComponentData;
    path = ["Utilities", "Projects"];
    constructor(private http: ReteHttpService) {
        super("Sain File Path");
        this.data.render = "angular";
        this.data.component = MyNodeComponent;
    }
    async builder(node) {
        return node
        .addControl(new TextControl(this.editor, "Project", "Project Path", "text", true))
        .addOutput(new Output("fileuploader_output","Output",SocketManagment.findSocket("File Upload")));
    }
    async worker(node, inputs, outputs) {
        outputs["fileuploader_output"] = node.data.Project;
        var index = this.http.CurrentRuningProcess.findIndex(
          (process) => process.id == node.id
        );
        this.http.CurrentRuningProcess.splice(index, 1);
    }
}

export class GeneratedComponent extends Component implements AngularComponent {
    data: AngularComponentData;
    path = [];
    component: ReteComponent;
    owner:string;
    Files: String[] = [];
    Data: String[] = [];
    output: String;
    constructor(name, component, private http: ReteHttpService) {
        super(name);
        this.data.render = "angular";
        this.data.component = MyNodeComponent;
        this.component = component;
        this.path = component.Categories;
        this.owner=component.owner;
        console.log(this.name+":"+this.owner)
    }
    async builder(node) {
        this.createInputItems(node);
        this.createOutputItems(node);
        return node;
    }
    async worker(node, inputs, outputs) {
        var util = new Util(this.http, this.engine, node, inputs, outputs);
        util.Formdata=new FormData();
        if(this.http.ToolEnginesServer=="local"){
            await util.isToolExistLocaly(this.owner)
        }
        util.Formdata.set("ToolFilePath", this.component.ToolFilePath);
        util.Formdata.set("Code", this.component.Code);
        util.Formdata.set("Toolname", this.name);
        util.Formdata.set("Language", this.component.Language);
        for (var file of this.Files) await util.uploadFiles(file, file);
        await util.appendData(this.Data);
        await util.runOnTheBackend(this.component.Route, this.output);
    }
    createOutputItems(node: Node) {
        this.component.Outputs.forEach((element) => {
            var socket = SocketManagment.findSocket(this.name);
            const output = new Output(element.Name, element.Title, socket);
            node.addOutput(output);
            this.output = element.Name;
        });
    }
    createInputItems(node: Node) {
        this.component.Inputs.forEach((element) => {
            if (element.isValid) {
                switch (element.control) {
                    case "TextControl": {
                        this.createTextControl(node, element);
                        break;
                    }
                    case "SliderControl": {
                        this.createSliderControl(node, element);
                        break;
                    }
                    case "DropDownControl": {
                        this.createDropDownControl(node, element);
                        break;
                    }
                    case "CheckBoxControl": {
                        this.createCheckBoxControl(node, element);
                        break;
                    }
                    case "FileControl": {
                        this.createFileControl(node, element);
                        break;
                    }
                }
            }
        });
    }
    createTextControl(node: Node, element) {
        var control = new TextControl(
            this.editor,
            element.Name,
            element.Title,
            element.type.type,
            element.required
        );
        node.addControl(control);
        this.Data.push(element.Name);
    }
    createSliderControl(node: Node, element) {
        var control = new SliderControl(
            this.editor,
            element.Name,
            element.default,
            element.min,
            element.max,
            element.step,
        );
        node.addControl(control);
        this.Data.push(element.Name);
    }
    createCheckBoxControl(node: Node, element) {
        var control = new SingleCheckboxControl(
            this.editor,
            element.Name,
            element.Title,
            element.default
        );
        node.addControl(control);
        this.Data.push(element.Name);
    }
    createDropDownControl(node: Node, element) {
        var control = new DropDownControl(
            this.editor,
            element.Name,
            element.options
        );
        node.addControl(control);
        this.Data.push(element.Name);
    }
    createFileControl(node: Node, element) {
        var control = new FileControl(
            this.editor,
            element.Name,
            element.Title,
            element.Tags
        );
        this.Files.push(element.Name);
        if (element.hasinput) {
            var socket = new Socket(this.name + " " + element.Title);
            SocketManagment.combineSockets(socket, element.Sockets);
            const input = new Input(element.Name, element.Name, socket);
            input.addControl(control);
            node.addInput(input);
        } else {
            node.addControl(control);
        }
    }
}

export class DependencyComponent extends Component implements AngularComponent {
    data: AngularComponentData;
    component: ReteComponent;
    output: String;
    constructor(name, component) {
        super(name);
        this.data.render = "angular";
        this.data.component = MyNodeDependencyComponent;
        this.component = component;
    }
    async builder(node) {
        this.createInputItems(node);
        this.createOutputItems(node);
        return node;
    }

    createOutputItems(node: Node) {
        this.component.Outputs.forEach((element) => {
            var socket = SocketManagment.findSocket(this.name);
            const output = new Output(element.Name, element.Title, socket);
            node.addOutput(output);
            this.output = element.Name;
        });
    }
    async worker(node, inputs, outputs) {
    }
    createInputItems(node:Node){
        this.component.Inputs.forEach(element => {
            if(element.isValid && element.control=='FileControl'){
                  this.createInput(node,element);
            }
        });
    }
    createInput(node: Node, element) {
        if (element.hasinput) {
            var socket = new Socket(this.name + " " + element.Title);
            SocketManagment.combineSockets(socket, element.Sockets);
            const input = new Input(element.Name, element.Name, socket,true);
            node.addInput(input);
        }
    }
}

