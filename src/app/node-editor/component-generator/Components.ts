import { saveAs } from "file-saver";
import {
    Component,
    Input,
    Output,
    Node,
    Socket
} from "rete";
import { TextControl } from "../Controls/text-input/text-input.component";
import { FileControl } from "../Controls/file-input/file-input.component";
import { SliderControl } from "../Controls/slider-input/slider-input.component";
import { SingleCheckboxControl } from "../Controls/single-checkbox/single-checkbox.component";
import { DropDownControl } from "../Controls/dropd-down-input/drop-down-input.component";
import {
    AngularComponent,
    AngularComponentData,
} from "rete-angular-render-plugin";
import {
    MyNodeComponent
} from "../Nodes/node/node.component";
import { ReteComponent } from "../../classes/component";
const ControlSocket = new Socket("Control");
const OutputSocket = new Socket("Output");

export class GeneratedComponent extends Component implements AngularComponent {
    data: AngularComponentData;
    path = [];
    component: ReteComponent;
    constructor(name, component) {
        super(name);
        this.data.render = "angular";
        this.data.component = MyNodeComponent;
        this.component = component;
    }
    async builder(node) {
        this.createInputItems(node);
        this.createOutputItems(node);
        return node;
    }
    async worker(node, inputs, outputs) {}
    createOutputItems(node: Node) {
        this.component.Outputs.forEach((element) => {
            var socket = new Socket(this.name);
            const output = new Output(element.Name, element.Name, socket);
            node.addOutput(output);
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
    }
    createSliderControl(node: Node, element) {
        var control = new SliderControl(
            this.editor,
            element.Name,
            element.default,
            element.min,
            element.max,
            element.step
        );
        node.addControl(control);
    }
    createCheckBoxControl(node: Node, element) {
        var control = new SingleCheckboxControl(
            this.editor,
            element.Name,
            element.Title,
            element.default
        );
        node.addControl(control);
    }
    createDropDownControl(node: Node, element) {
        var control = new DropDownControl(
            this.editor,
            element.Name,
            element.options
        );
        node.addControl(control);
    }
    createFileControl(node: Node, element) {
        var control = new FileControl(
            this.editor,
            element.Name,
            element.Title,
            element.Tags
        );
        if (element.hasinput) {
            var socket = new Socket(this.name + " " + element.Title);
            const input = new Input(element.Name, element.Name, socket);
            input.addControl(control);
            node.addInput(input);
        } else {
            node.addControl(control);
        }
    }
}
