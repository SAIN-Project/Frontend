export class ProcessStatus{
    id:number;
    status:string='';
    constructor(id:number){
        this.id=id;
    }
    setStatusWithProgress(status:string, progress){
        if(status.length>20) status=status.substring(0,20);
        this.status='Uploading '+status+'  '+progress+"%";
    }
    setStatusExtracting(status:string){
        if(status.length>20) status=status.substring(0,20);
        this.status='Processing File '+status+'  ... ';
    }
    setStatusExecutingTool(nodename){
        this.status='Executing '+nodename+' Code  ...'
    }
    setCloningStatus(status:string){
        this.status=status;
    }
    removeStatus(){
        this.status=''
    }
};