export class Files{
    Filelist:Array<File>=[];
    addFile() {
        var file:File=new File([""], "", {type: "",});
        this.Filelist.push(file)
    } 
    removeFile(i:number){
        this.Filelist.splice(i,1);
    }
    isValid():boolean{
        for(var file of this.Filelist){
            if(file.name.length==0) return false;
        }
        return true;
    }
    isValidFile(file:File){
        return file.name!=''
    }
    appendFilesToForm(data:FormData){
        this.Filelist.forEach(file=>{
            data.append(file.name,file,file.name)
        })
    }
}
export interface Category{
    key:String,
    values:Array<String>;
}
export class Categories{
    CategoriesList:Category[]=[];
    isValid():Boolean{
        return this.CategoriesList.length!=0;
    }

    push(key:string,value:string){
        var index=this.CategoriesList.findIndex(c=>c.key==key)
        if(index==-1){
            this.CategoriesList.push({key:key,values:[value]})
        }
        else{
            this.CategoriesList[index].values.push(value)
        }   
    }
    pop(key:string,value:string){
        
        var index=this.CategoriesList.findIndex(c=>c.key==key)
        if(this.CategoriesList[index].values.length==1)
            this.CategoriesList.splice(index,1)
        else{
            var k=this.CategoriesList[index].values.indexOf(value)
            this.CategoriesList[index].values.splice(k,1)
        }
       
    }
    isChecked(key:string,value:string):Boolean{
        var checked=false;
        var index=this.CategoriesList.findIndex(c=>c.key==key);
        if(index!=-1){
            checked =this.CategoriesList[index].values.indexOf(value)!=-1;
        }
        return checked;
    }
    toJsonString():string{
        return JSON.stringify(this.CategoriesList)
    }
    fromJson(items:any[]){
        if(!items) return;
        if(items.length==0) return;
        items.forEach(item=>{
            this.CategoriesList.push({
                key:item.key,
                values:item.values
            })
        })
    }
}
export interface PublicationInterface{
    title:String;
    link:String;
    organization:string;
}
export class Publications{
    isValid=false;
    Publicationlist:Array<PublicationInterface>=[];
    push(){
        this.Publicationlist.push({
            title:'',
            link:'',
            organization:''
        })
    }
    pop(i:number){
        this.Publicationlist.splice(i,1)
    }
    toJsonString(){
        return JSON.stringify(this.Publicationlist)
    }
    fromJson(items:any[]){
        if(!items) return;
        this.isValid=true;
        items.forEach(item=>{
            this.Publicationlist.push({
                title:item.title,
                link:item.link,
                organization:item.organization
            })
        })
    }
    importFromFile(Publications:Publications){
        this.Publicationlist=Publications.Publicationlist;
        this.isValid=Publications.isValid;
    }

};
export interface AuthorInterface{
    name:String;
    website:String;
    organization:string;
};
export class Authors{
    isValid=false;
    Authorlist:Array<AuthorInterface>=[];
    push(){
        this.Authorlist.push({
            name:'',
            website:'',
            organization:''
        })
    }
    pop(i:number){
        this.Authorlist.splice(i,1)
    }
    toJsonString():string{
        return JSON.stringify(this.Authorlist)
    }
    fromJson(items:any[]){
        if(!items) return;
        this.isValid=true;
        items.forEach(item=>{
            this.Authorlist.push({
                name:item.name,
                website:item.website,
                organization:item.organization
            })
        })
    }
    importFromFile(Authors:Authors){
        this.Authorlist=Authors.Authorlist
        this.isValid=Authors.isValid;
    }
    
}

export interface InputInterface{
    name:string;
    description:string;
};
export class ComponentInputs{
    Inputs:Array<InputInterface>=[];
    isValid=false;
    push(){
        this.Inputs.push({name:'',description:''});
    }
    pop(i:number){
        this.Inputs.splice(i,1);
    }
    toJsonString():string{
        return JSON.stringify(this.Inputs)
    }
    fromJson(items:any[]){
        if(!items) return;
        this.isValid=true;
        items.forEach(item=>{
            this.Inputs.push({
                name:item.name,
                description:item.description
            })
        })
    }
    importFromFile(Inputs:ComponentInputs){
        this.Inputs=Inputs.Inputs;
        this.isValid=Inputs.isValid;
    }
    
};
export interface Tag{
    key:String,
    values:Array<String>;
}
export class Tags{
    TagsList:Tag[]=[];
    isValid():Boolean{
        return this.TagsList.length!=0;
    }
    initializeTags(key:string){
        this.TagsList.push({key:key,values:[]})
    }
    push(key:string,value:string){
        var index=this.TagsList.findIndex(c=>c.key==key)
        if(index>=0){
            this.TagsList[index].values.push(value)
        }  
    }
    pop(key:string,value:string){
        
        var index=this.TagsList.findIndex(c=>c.key==key)
        if(index>=0){
            var k=this.TagsList[index].values.indexOf(value)
            this.TagsList[index].values.splice(k,1)
        }     
    }

    toJsonString():string{
        return JSON.stringify(this.TagsList)
    }
    fromJson(items:any[]){
        if(items.length==0) return;
        items.forEach(item=>{
            this.TagsList.push({
                key:item.key,
                values:item.values
            })
        })
    }
    toArray():String[]{
        var array:String[]=[];
        for(var item of this.TagsList){
            array=array.concat(item.values)
        }
        return array;
    }
}