export class OutputField {
    Name: String = "";
    Title: String = "";
    isValid = false;
    constructor() {}
}
export class Field {
    control: String;
    Name: String = "";
    Title: String = "";
    isValid = false;
    required = false;
    type: {
        text: string;
        type: string;
    };
    constructor(type, control) {
        this.type = type;
        this.control = control;
    }
}
export class TextControl extends Field {
    constructor(type) {
        super(type, "TextControl");
    }
}
export class CheckBoxControl extends Field {
    default = false;
    constructor(type) {
        super(type, "CheckBoxControl");
    }
}
export class FileControl extends Field {
    hasinput = false;
    Sockets: any = [];
    Tags: string[] = [];
    constructor(type) {
        super(type, "FileControl");
    }
}
export class SliderControl extends Field {
    min: number;
    max: number;
    default: number;
    step: number;
    constructor(type) {
        super(type, "SliderControl");
    }
}
export class DropDownControl extends Field {
    options: Array<string> = [""];
    constructor(type) {
        super(type, "DropDownControl");
    }
}
