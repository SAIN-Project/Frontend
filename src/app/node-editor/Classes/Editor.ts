import { Component, Input, Output, Node ,Socket,Control} from 'rete';

import { NodeEditor, Engine } from 'rete';
import ConnectionPlugin from 'rete-connection-plugin';
import { AngularRenderPlugin } from 'rete-angular-render-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin'
import {ReteHttpService} from '../../services/rete-http.service'
import { Time } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';

export class Editor{
    components=[]
    Editor:NodeEditor = null;
    Engine:Engine=null;
    isProcessing:boolean=false;
    StartTime:any;
    ExecutionTime:string="00:00:00";
    DefaultZoom=8;

    constructor(private http:ReteHttpService){

    }
    
    InitializeComponents(){
        this.Editor.components.forEach(c=>{
            this.Editor.components.delete(c.name);
            this.Engine.components.delete(c.name)
        })
        this.components.map(c => {
            this.Editor.register(c);
            this.Engine.register(c);
        });
    }

    createEditor(container){
        
        const editor = new NodeEditor('demo@0.2.0', container);
        this.Editor=editor;
        editor.use(ConnectionPlugin);
        editor.use(AngularRenderPlugin)
        editor.use(ContextMenuPlugin,{
            delay:300,
            allocate(component){
                return component.path;  
            }
        });
        const engine = new Engine('demo@0.2.0');
        this.Engine=engine;
        this.InitializeComponents();
        editor.on(['process'], (async () => {
            this.StartTime=new Date();
            var MyTimer=setInterval(()=>{
                var CurrentTime=new Date();
                var runtime=Math.floor((CurrentTime.getTime()-this.StartTime.getTime())/1000);
                var hours=Math.floor(runtime/3600).toString()
                var minutes=Math.floor((runtime%3600)/60).toString();
                var seconds=(runtime%60).toString();
                this.ExecutionTime=setTimeFormat(hours)+":"+setTimeFormat(minutes)+":"+setTimeFormat(seconds)
            },1000)
            var setTimeFormat=(str:string)=>{
                str=str.length==1?'0'+str:str;
                return str;
            }
            this.http.nodes=[]
            await engine.abort();
            await engine.process(editor.toJSON());
            this.http.CurrentRuningProcess=[]
            this.isProcessing=false;
            clearInterval(MyTimer);
            
        }) as any);
        
        editor.on('error', (e) => {
            alert(e)
            console.log(e)
        });

        engine.on('destroy',(e) => {
            var result=engine.throwError('Engien has been stoped by user')
            console.log(result)
        });
        editor.on('zoom', (e) => {
            return e.source !== 'dblclick';
        });
        editor.view.resize();
        editor.view.container.addEventListener('dragover', e => {
            e.preventDefault()
        })
        editor.view.container.addEventListener('drop',async e => {
            if(!e.dataTransfer) return;
            const name = e.dataTransfer.getData('componentName');
            const component = this.components.find(c=>c.name==name)
            if(!component) throw new Error(`Component ${name} not found`)
            // force update the mouse position
            editor.view.area.pointermove(e as any as PointerEvent);
            
            const node = await this.createNode(component, editor.view.area.mouse);
            editor.addNode(node)
        })

    }
    async  createNode(component: Component, position: { x: number, y: number }) {
        let node = await component.createNode({});
        node.position = [position.x, position.y];
        return node;
    }
    
    onRangeChange(value){   
        var x=value-this.DefaultZoom;
        this.DefaultZoom=value;
        var sign=x/Math.abs(x)
        var i=0;
        var editor=this.Editor;
        var interval=setInterval(function(){
            i=i+1;
            if(i==Math.abs(x)) clearInterval(interval)
            zoom(sign/10)
        }, 10);
        var zoom=function(x){
            const { area } = editor.view; // read from Vue component data;
            const rect = area.el.getBoundingClientRect();
            const ox = (rect.left - window.innerWidth / 2) * x;
            const oy = (rect.top - window.innerHeight / 2) * x;         
            area.zoom(area.transform.k + x, ox, oy,'touch');
        }
    }
}