import {
  Component,
  ChangeDetectorRef,
  Input,
  Output,
  OnInit,
  AfterViewInit,
} from "@angular/core";
import { NodeComponent, NodeService } from "rete-angular-render-plugin";
import { ToolService } from "../../../services/tool.service";
import { ReteService } from "../../../services/rete.service";
import { ReteHttpService } from "../../../services/rete-http.service";

import { ModalService } from "../../../services/modal.service";
import { RoutingService } from "../../../services/routing.service";
import { ToolComponent } from "../../../classes/tool";
class input{
  Nodename:string='';
  viewdependency:boolean=false;
}
@Component({
  templateUrl: "./node.component.html",
  styleUrls: ["./node.component.sass", "node.scss"],
  providers: [NodeService],
})
export class MyNodeComponent extends NodeComponent {
  input:input=new input()
  viedependency = true;
  Component: ToolComponent = new ToolComponent();
  uploaded: boolean = false;
  public max: boolean = true;
  constructor(
    protected service: NodeService,
    protected cdr: ChangeDetectorRef,
    public modal: ModalService,
    public router: RoutingService,
    public toolservice: ToolService,
    public rete: ReteService,
    public http: ReteHttpService
  ) {
    super(service, cdr);
    
  }
  onMinimizeMaximize() {
    this.max = !this.max;
    this.editor.view.resize();
  }
  getReteComponent() {
    if (this.uploaded == false) {
      this.rete.getReteByName(this.node.name).subscribe((response) => {
        this.getToolComponent(response.owner);
      });
      this.uploaded = true;
    }
  }
  getToolComponent(id: string) {
    this.toolservice.getToolComponentById(id).subscribe(
      (response) => {
        this.Component.fromJson(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  isNodeRunning(): boolean {
    var index = this.http.getChildProcessIndex(this.node.id);
    return index != -1;
  }
  getStatus(): string {
    var status = "";
    var index = this.http.getChildProcessIndex(this.node.id);
    if (index != -1) status = this.http.CurrentRuningProcess[index].status;
    return status;
  }
  isCompleted(): boolean {
    return this.http.CompletedProcess.indexOf(this.node.id) != -1;
  }
  changeView() {
    this.input.viewdependency=!this.input.viewdependency;
  }
  viewDetails(){
    this.input.viewdependency=false;
    this.input.Nodename=this.node.name;
    this.getReteComponent();
  }
}

@Component({
  templateUrl: "./node-dependency.component.html",
  styleUrls: ["./node.component.sass", "node.scss"],
  providers: [NodeService],
})
export class MyNodeDependencyComponent extends NodeComponent {
  constructor(
    protected service: NodeService,
    protected cdr: ChangeDetectorRef
  ) {
    super(service, cdr);
  }
  alert(){
    
  }
}

@Component({
  selector: 'app-component-dependency-details',
  templateUrl: "./component-details-dependency.html",
  styleUrls: ["./node.scss"]
})
export class DetailsDependencycomponent implements OnInit{
  @Input() input: any;
  Component: ToolComponent = new ToolComponent();
  ReteComponent:any;
  uploaded: boolean = false;
  constructor(public toolservice: ToolService, public rete: ReteService) {}
  ngOnInit() {
    this.getReteComponent();
  }
  getReteComponent() {
    if (this.uploaded == false) {
      this.rete.getReteByName(this.input.Nodename).subscribe((response) => {
        this.ReteComponent=response;
        this.getToolComponent(response.owner);
      });
      this.uploaded = true;
    }
  }
  getToolComponent(id: string) {
    this.toolservice.getToolComponentById(id).subscribe(
      (response) => {
        this.Component.fromJson(response);
      }
    );
  }
}
