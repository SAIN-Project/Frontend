import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Input,
} from "@angular/core";
import { Input as NodeInput, Output, Node, Socket, Engine } from "rete";
import { ReteHttpService } from "../../services/rete-http.service";
import { ReteService } from "../../services/rete.service";
import * as Generator from "../Classes/components";
import { Subscription } from "rxjs";
import { Editor } from "../Classes/Editor";
import AutoArrangePlugin from "rete-auto-arrange-plugin";

@Component({
    selector: "app-component-dependency",
    templateUrl: "./component-generator.component.html",
    styleUrls: ["./component-generator.component.css"],
})
export class ComponentDependency implements OnInit, AfterViewInit {
    @Input() data: any;
    ReteComponent: any;
    Editor: Editor = new Editor(this.http);
    InputResponse: any[];
    OutputResponse: any[];
    position = null;
    defaultzoom = 10;
    CurrentZoomIntensity = 10;
    @ViewChild("nodeEditor", { static: true }) nodeElement: ElementRef;
    constructor(private http: ReteHttpService, private rete: ReteService) {}

    ngOnInit() {}

    ngAfterViewInit() {
        var container = this.nodeElement.nativeElement;
        this.position = {
            x: container.offsetWidth / 2,
            y: 50,
        };
        this.ReteComponent = JSON.parse(this.data.contents);
        this.getDependency();
        this.Editor.createEditor(this.nodeElement.nativeElement);
        this.Editor.Editor.use(AutoArrangePlugin, {
            margin: { x: 200, y: 50 },
            depth: 0,
        });
        var component = new Generator.DependencyComponent(
            this.data.name,
            this.ReteComponent
        );
        this.Editor.components = [component];
    }
    async getDependency() {
        var inputs = this.ReteComponent.Inputs.filter(
            (input) => input.control == "FileControl"
        );
        var inputsockets = [];
        for (var input of inputs) {
            for (var socket of input.Sockets) {
                if (inputsockets.indexOf(socket) == -1)
                    inputsockets.push(socket);
            }
        }
        var data = {
            name: this.ReteComponent.Name,
            inputsockets: inputsockets,
        };
        var response = await this.rete.getComponentDependency(data);
        this.InputResponse = response.inputs;
        this.OutputResponse = response.outputs;
        var inputcomponents = this.initializeComponents(this.InputResponse);
        var outputcomponents = this.initializeComponents(this.OutputResponse);
        this.Editor.InitializeComponents();
        var Mainnode = await this.createNode();
        var inputnodes = await this.createNodes(inputcomponents);
        var outputnodes = await this.createNodes(outputcomponents);
        this.createInputConnections(Mainnode, inputnodes);
        this.createOutputConnections(Mainnode, outputnodes);
        this.onZoomChange(-4);
        this.Editor.Editor.trigger("arrange" as any, Mainnode);
    }
    initializeComponents(components) {
        var generatedcomponents = [];
        for (var item of components) {
            var component = new Generator.DependencyComponent(
                item.name,
                JSON.parse(item.contents)
            );
            this.Editor.components.push(component);
            generatedcomponents.push(component);
        }
        return generatedcomponents;
    }
    async createNode() {
        this.Editor.Editor.clear();
        var node = await this.Editor.createNode(
            this.Editor.components[0],
            this.position
        );
        this.Editor.Editor.addNode(node);
        return node;
    }
    async createNodes(components: any[]) {
        var nodes = [];
        for (var i = 0; i < components.length; i++) {
            var node = await this.Editor.createNode(
                components[i],
                this.position
            );
            nodes.push(node);
            this.Editor.Editor.addNode(node);
        }
        return nodes;
    }
    createInputConnections(Mainnode: Node, InputNodes: Node[]) {
        for (var node of InputNodes) {
            var output = node.outputs.entries().next().value[1];
            var inputs = this.ReteComponent.Inputs.filter(
                (input) =>
                    input.control == "FileControl" &&
                    input.Sockets.includes(node.name)
            );
            for (var input of inputs) {
                var nodeinput = Mainnode.inputs.get(input.Name);
                this.Editor.Editor.connect(output, nodeinput);
            }
        }
    }
    createOutputConnections(Mainnode: Node, OutputNodes: Node[]) {
        var output = Mainnode.outputs.entries().next().value[1];
        for (var i = 0; i < this.OutputResponse.length; i++) {
            var node = this.OutputResponse[i];
            var inputs = node.inputs.filter((input) =>
                input.sockets.includes(Mainnode.name)
            );
            var destnode = OutputNodes[i];
            for (var input of inputs) {
                var nodeinput = destnode.inputs.get(input.name);
                this.Editor.Editor.connect(output, nodeinput);
            }
        }
    }
    onZoomChange(value) {
        if (
            (this.CurrentZoomIntensity == 1 && value == -1) ||
            (this.CurrentZoomIntensity == 20 && value == 1)
        )
            return;
        this.CurrentZoomIntensity += value;
        this.Editor.onRangeChange(this.CurrentZoomIntensity);
        this.Editor.Editor.view.area.translate(50, 250);
    }
}
