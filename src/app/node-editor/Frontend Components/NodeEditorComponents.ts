import { 
    Component,OnInit, AfterViewInit, ViewChild, ElementRef ,Renderer2,Input,Output
} from '@angular/core';
import { NodeEditor, Engine } from 'rete';
import {ReteHttpService} from '../../services/rete-http.service'
import {ReteService} from '../../services/rete.service'
import {ToolService} from'../../services/tool.service'
import * as Components  from '../Classes/components'
import {ModalService} from '../../services/modal.service'
import {Editor} from '../Classes/Editor'
import{saveAs} from'file-saver'
import {RoutingService} from '../../services/routing.service'
declare var $:any

@Component({
    selector: 'app-editor',
    templateUrl: './templates/editor.component.html',
    styleUrls: ['./node-editor.scss','../node.scss']
})
export class EditorComponent implements AfterViewInit ,OnInit {

    components:any[] = [
        new Components.FileUploader(this.http),
        new Components.ProjectFilePath(this.http),
    
    ];
    EditorFactory:Editor
    DatabaseReteComponents:any[]=[];
    @ViewChild('nodeEditor', { static: true }) el: ElementRef;
    constructor(
        private toolservice:ToolService,
        private http:ReteHttpService,
        private renderer: Renderer2,
        private modal :ModalService,
        private rete:ReteService
    ){}

    ngOnInit(){
        $(document).ready(function () {
      
            $('#terminal').toggleClass('active').removeClass('d-none');
            $('#vars').toggleClass('active').removeClass('d-none');
            $('#sidebarCollapse i,#dismiss').on('click', function () {
                $('.left-sidebar').toggleClass('active');
                $('#sidebarCollapse i').toggleClass('hidden')
            });
            $('#vars-collapse,#vars-dismiss').on('click', function () {
              $('#vars').toggleClass('active');
            });
            $('#terminal-collapse,#terminal-dismiss').on('click', function () {
              $('#terminal').toggleClass('active');
            });
      
            $('nav ul li').click(function(){
              $(this).addClass("active").siblings().removeClass("active");
            });   
        });
        this.EditorFactory=new Editor(this.http)

    }
    async ngAfterViewInit(){
        const container = this.el.nativeElement;
        var sockets:any[]=await this.rete.getSocketsNames();
        sockets.forEach(socket=>{
            Components.SocketManagment.createSocket(socket)
        })
        this.DatabaseReteComponents=await this.rete.getRetes();
        this.DatabaseReteComponents.forEach(item=>{
            var component=new  Components.GeneratedComponent(item.name,JSON.parse(item.contents),this.http)
            this.components.push(component);
        })
        this.EditorFactory.components=this.components;
        this.EditorFactory.createEditor(container)

    }
    
}

@Component({
    selector: 'app-editor-list',
    templateUrl: './templates/componentlist.component.html',
    styleUrls: ['../node.scss']
})
export class ListComponent implements AfterViewInit ,OnInit {
    @Input() components:any[]
    Categories:any[]
    searchComponents=[];
    SearchTerm=''  
    constructor(
        private toolservice:ToolService,
        private http:ReteHttpService,
    ){}
    
    async ngOnInit(){
        this.Categories=await this.toolservice.getCategoryList()
        this.Categories=this.Categories.filter(item=>item.key=='Category')[0].values;
        this.filterComponents();
    }
    async ngAfterViewInit(){

    }
    addComponent(event,name){
        event.dataTransfer.setData('componentName', name);
    }
    findComponents(path:string){
        if(this.SearchTerm=='')
            return this.components.filter(c=>c.path.includes(path));
        else
            return this.searchComponents.filter(c=>c.path.includes(path));
    }
    filterComponents(){
        this.searchComponents=this.components.filter(c=>c.name.toLowerCase().includes(this.SearchTerm.toLowerCase()))
    }
    
}

@Component({
    selector: 'app-editor-terminal',
    templateUrl: './templates/terminal.component.html',
    styleUrls: ['../node.scss']
})
export class TerminalComponent implements AfterViewInit ,OnInit {
    mode:boolean=true;
    counter=0;
    constructor(
        private toolservice:ToolService,
        private http:ReteHttpService,
        private renderer: Renderer2,
        private modal :ModalService,
    ){}
    @ViewChild('term', { static: true }) terminal: ElementRef;
    ngOnInit(){

    }
    async ngAfterViewInit(){
              
    }   
    clear(){
        this.http.socketoutput=[];
    } 
}

@Component({
    selector: 'app-editor-outputblackboard',
    templateUrl: './templates/outputblackboard.component.html',
    styleUrls: ['../node.scss']
})
export class OutputBlackboardComponent implements AfterViewInit ,OnInit {
    constructor(
        private toolservice:ToolService,
        private http:ReteHttpService,
        private modal :ModalService,
    ){}
    
    ngOnInit(){

    }
    async ngAfterViewInit(){

    }
    getFileName(filepath:string){
        if(!filepath) return ''
        var index=filepath.lastIndexOf('/')
        var filename=filepath.substring(index+1)
        if(filename.indexOf('.')==-1) filename=filename+'.zip'
        return filename;
    }
    getData(data:any){
        if(data instanceof Object){
            if(data['filepath']){
                var filepath=data['filepath']
                var index=filepath.lastIndexOf('\\')
                var filename=filepath.substring(index+1)
                return filename;
            }
        }
        return data;
    }
    copyFilePath(filepath:string){
        navigator.clipboard.writeText(filepath).then().catch(e => console.error(e));
    }
    
}
@Component({
    selector: 'app-editor-navbar',
    templateUrl: './templates/navbar.component.html',
    styleUrls: ['../node.scss']
})
export class NavbarComponent implements AfterViewInit ,OnInit {
    @Input() Editor:Editor
    
    private Samples:any=[]
    CurrentZoomIntensity=8;

    constructor(
        private toolservice:ToolService,
        private http:ReteHttpService,
        private modal :ModalService,
        private router:RoutingService
    ){}
    
    ngOnInit(){
        this.toolservice.getSamples().subscribe(response=>{
            this.Samples=response; 
        },error=>{
            console.log('error')
        })
    }
    async ngAfterViewInit(){

    }
    async start(template){
        await this.http.setupSocketConnection()
        this.http.CompletedProcess=[];
        this.http.socketoutput=[];
        if(this.Editor.Editor.nodes.length>0){
            this.http.ValidatorErrors=[]
            var validator=new Components.Validator(this.http)
            for(var node of this.Editor.Editor.nodes){
                validator.validate(node)
            }
            if(this.http.ValidatorErrors.length) {
                console.log(this.http.ValidatorErrors)
                this.modal.open(template)
            }
            else{
                this.http.socket.on('data', (data: string) => {
                    if(data.length>1000) 
                        data=data.substring(0,1000)+' ...  '
                    if((data!='') && this.http.TerminalStreamingMode==true)
                        this.http.socketoutput.push({type:'data',data});
                    var element = document.getElementById("terminal");
                    element.scrollTop = element.scrollHeight;
                });
                this.http.socket.on('error', (data: string) => {
                    if(data!='') 
                        this.http.socketoutput.push({type:'error',data})
                    var element = document.getElementById("terminal");
                    element.scrollTop = element.scrollHeight;
                });
                this.Editor.isProcessing=true;
                await this.Editor.Editor.trigger('process')
            }
        }  
    }
    stop(){
        
        this.Editor.Engine.abort().then(()=>{
            this.Editor.isProcessing=false;
            this.http.CurrentRuningProcess=[];
        })

    }
    hasNodes(){
        if(this.Editor.Editor==null) return false;
        if(this.Editor.Editor.nodes.length==0) return false;
        return true;
    }

    onZoomChange(value){
   
        if(!this.hasNodes()) return;
        if((this.CurrentZoomIntensity==1 && value==-1)||(this.CurrentZoomIntensity==16 && value==1)) return;
        this.CurrentZoomIntensity+=value;
        this.Editor.onRangeChange(this.CurrentZoomIntensity)
    }
    importFromJson(event){
        this.http.CompletedProcess=[];
        if (event.target.files.length > 0) {
            var file = <File>event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");
            fileReader.onloadend = () => {
                const json=JSON.parse(<string>fileReader.result)
                this.Editor.Editor.fromJSON(json)
            }
            fileReader.onerror = (error) => {
                console.log(error);
            }
        }
        
    }
    exportToJson(){
        var data=this.Editor.Editor.toJSON()
        const blob = new Blob([JSON.stringify(data)], {type : 'application/json'});
        saveAs(blob, 'editor.json');
    }
    clear(){
        this.Editor.Editor.clear();
    }
    
    loadSample(item){
        this.modal.hide()
        const json=JSON.parse(<string>item.contents)        
        this.Editor.Editor.fromJSON(json)
        
    }
    setLocalServerConnection(template:any){
        if(this.http.ToolEnginesServer!='Local')
            this.modal.open(template)

    }
    ExitEditor(exit){
        if(this.Editor.Editor.nodes.length>0){
            this.modal.open(exit,'modal-md')
        }
        else{
            this.router.navigateTo('/tool/tools')
        }
    }
    confirmExit(){
        this.router.navigateTo('/tool/tools')
        this.modal.hide();
    }
}

@Component({
    selector: 'app-docker-connector',
    templateUrl: './templates/dockerconnector.component.html',
    styleUrls: ['../node.scss']
})
export class DockerConnecter implements OnInit {
    isLoading=false;
    error=null;

    constructor(
        private http:ReteHttpService,
        private modal:ModalService,
        private router:RoutingService
    ){

    }
    ngOnInit(){

    }
    setLocalServer(){
        this.isLoading=true;
        this.error=null;
        this.http.isLocalServerAlive().subscribe((response)=>{
            this.http.ToolEnginesServer="Local";
            this.http.url=this.http.getLocalUrl();
            this.http.setupSocketConnection();
            this.isLoading=false;
            this.modal.hide();
        },(error)=>{
            this.isLoading=false;
            this.error=error;

        })
    }
}
