export class ReteComponent{
    Name:String='';
    Inputs:Array<any>=[];
    Outputs:Array<any>=[];
    Route:String='ToolsBackendService';
    Categories:Array<any>=[];
    ToolFilePath:string="";
    Language:string='java'
    Code:string=""
    owner:string;
    
    addItem(item){
        this.Inputs.push(item)
    }
    delete(item){
        var index=this.Inputs.indexOf(item)
        this.Inputs.splice(index,1)
    }
    addOutput(item){
        this.Outputs.push(item)
    }
    deleteOutput(item){
        var index=this.Outputs.indexOf(item)
        this.Outputs.splice(index,1)
    }
    isValid():boolean{
        var result:boolean=this.isValidInputs()&&this.isValidInputs()&&this.isValidInfo();
        return result;
    }
    isValidInputs():boolean{
        var length=this.Inputs.length
        var validcontrols=this.Inputs.filter(item=>item.isValid==true).length
        var result= (length!=0 )&&(validcontrols===length)
        return result
    }
    isValidOutputs():boolean{
        var validcontrols=this.Outputs.filter(item=>item.isValid==true).length
        var length=this.Outputs.length
        var result=validcontrols===length
        return result;
    }
    isValidInfo():boolean{
        return this.Name!='' && this.Route!=''
    }
    async fromJson(data:string){
        var contents=JSON.parse(data)
        this.Name=contents.Name;
        this.Route="ToolsBackendService";
        this.Inputs=contents.Inputs;
        this.Outputs=contents.Outputs;
        this.Categories=contents.Categories;
        this.ToolFilePath=contents.ToolFilePath;
        this.Code=contents.Code?contents.Code:'';
        this.Language=contents.Language?contents.Language:'java';
        this.owner=contents.owner;
        return this;
    }
    initializeCode(){
        var code=["/********** Tool Command Line Parameters Initialization **************************"]
        code.push('-    All input variables are stored and accessable via \'Data\' Object. ')
        code.push('-    The system will automatically create Output directory for the tool with \''+this.Name+'\' name.')
        code.push('-    The Output Directory relative path is stored and accessed through \'OutputFilePath\' variable.')
        code.push('-    If your tool output you can change the OutputFilePath varialble to point to your file by using: ')
        code.push('     OutputFilePath=OutputFilePath+\'\\\'+Filename.ext;')
        code.push('-    Creat Subdirectory:  var  Subdirectory=OutputPath+\'\\SubDirectoryName\'')
        code.push("**********************************************************************************")
        code.push("*********** Copy and modify the below command variable ***************************/")
        code.push('const command=[')
        code.push('        \''+Languages[this.Language].join('\',\'')+'\',Data.ToolFilePath,')
        for(var input of this.Inputs){
          var inputcommand='        '+'\'-'+input.Name+'\',Data.'+input.Name+','
          code.push(inputcommand)
        }
        var outputcommand='        '+'\'-o\',OutputFilePath'
        code.push(outputcommand)
        code.push('    ];')
        
        this.Code=code.join('\n');
    
    }
}
const Languages={
    'java':['java','-jar'],
    'python':['python'],
    'g++':['g++'],
    'other':[]
}
