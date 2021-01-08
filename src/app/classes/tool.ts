import {Files,ComponentInputs,Authors,Publications,Categories} from './sharedclasses';
export class Tool{
    _id:string=''
    uploader:string=''
    lastupdate:Date=new Date();
    name:string='';
    description:string='';
    contents:string='';
    Files:Files=new Files();
    Categories:Categories=new Categories();
    publications:Publications=new Publications();
    authors:Authors=new Authors()
    constructor(){
    }
    isOneValid():Boolean{   
        return this.name.trim()!='' && this.description.trim()!='';
    }
    isTwoValid():Boolean{
        return this.contents.trim()!=''
    }
    toFormData():FormData{ 
        var data=new FormData();
        data.append('name',this.name);
        data.append('description',this.description)
        data.append('contents',this.contents);
        data.append('categories',this.Categories.toJsonString());
        data.append('publications',this.publications.toJsonString());
        data.append('authors',this.authors.toJsonString()); 
        this.Files.appendFilesToForm(data);
        return data;
    }
    fromJson(tool:any):Tool{
        this.Categories.fromJson(tool.categories)
        this.publications.fromJson(tool.publications)
        this.authors.fromJson(tool.authors);
        this.name=tool.name;
        this._id=tool._id;
        this.lastupdate=new Date(tool.lastupdate)
        this.uploader=tool.uploader;
        this.contents=tool.contents;
        this.description=tool.description;
        return this;
    }
    getLastUpdate(){
        return this.lastupdate.toDateString()
    }
    importFromFile(tool:Tool){
        this.Categories.CategoriesList=tool.Categories.CategoriesList;
        this.publications.importFromFile(tool.publications);
        this.authors.importFromFile(tool.authors);
        this.name=tool.name;
        this._id=tool._id;
        this.lastupdate=new Date(tool.lastupdate)
        this.uploader=tool.uploader;
        this.contents=tool.contents;
        this.description=tool.description;

    }
};

export class ToolComponent extends Tool{
    synopsis:string='';
    inputs:ComponentInputs=new ComponentInputs();
    output:string='';
    
    constructor(){
        super();
    }
    toFormData():FormData{
        var data=super.toFormData()
        data.append('synopsis',this.synopsis)
        data.append('inputs',this.inputs.toJsonString())
        data.append('output',this.output)
        return data;
    }
    fromJson(component:any):ToolComponent{
        super.fromJson(component);
        this.synopsis=component.synopsis;
        this.output=component.output;
        this.inputs.fromJson(component.inputs)
        return this;
    }
    isParametersValid():Boolean{
        if(this.synopsis=='') return false;
        if(this.output=='') return false;
        return this.inputs.isValid;
    }
    importFromFile(component:ToolComponent){
        super.importFromFile(component)
        this.inputs.importFromFile(component.inputs);
        this.synopsis=component.synopsis;
        this.output=component.output;
    }
}