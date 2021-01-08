import {Files,Tags,Categories} from './sharedclasses';

export  function fileSizeFormat(size:string):string{
    var x:number=parseInt(size)
    var unit="Kb";
    if(x<1024){
        return x+' '+'Kb';
    }
    if(x<1024*1024){
        x=x/(1024)*100;
        x=Math.round(x)/100;
        return x+' '+'Mb'
    }
    if(x<1024*1024*1024){
        x=x/(1024*1024)*100;
        x=Math.round(x)/100;
        return x+' '+'Gb'
    }
}


export class Dataset{
    name:string='';
    _id:string;
    uploader:string='';
    lastupdate:Date=new Date();
    description:string='';
    Files:Files=new Files();
    Categories:Categories=new Categories();

    Tags:Tags=new Tags();

    constructor(){
    }
    isOneValid():Boolean{   
        return this.name.trim()!='' && this.description.trim()!='';
    }

    toFormData():FormData{ 
        var data=new FormData();
        data.append('name',this.name);
        data.append('description',this.description) 
        data.append('categories',this.Categories.toJsonString());
        data.append('tags',this.Tags.toJsonString());

        
        this.Files.appendFilesToForm(data);

        return data;
    }
    getLastUpdate(){
        return this.lastupdate.toDateString()
    }
    fromJson(dataset:any):Dataset{
        this.Categories.fromJson(dataset.categories)
        this.Tags.fromJson(dataset.tags)
        this._id=dataset._id;
        this.name=dataset.name;
        this.lastupdate=new Date(dataset.lastupdate)
        this.uploader=dataset.uploader;
        this.description=dataset.description;
        return this;
    }
    importFromFile(dataset:Dataset){
        this.Categories.CategoriesList=dataset.Categories.CategoriesList;
        this.name=dataset.name;
        this._id=dataset._id;
        this.lastupdate=new Date(dataset.lastupdate)
        this.uploader=dataset.uploader;
        this.description=dataset.description;

    }
};