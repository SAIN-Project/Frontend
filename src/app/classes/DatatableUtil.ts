import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
export class DatatableUtil{
    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject<any>();
    dtOptions: DataTables.Settings = {};
    constructor(){
        
    }
    setDtElement(dtElement: DataTableDirective){
        this.dtElement=dtElement;
    }
    triggerNext(){
        this.dtTrigger.next();
    }
    reloadData(){
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  
            dtInstance.destroy();
            this.dtTrigger.next();
        });
    }
    reload(element){
        var dt=this;
        $(document).ready(function () {
            $('#'+element).DataTable().destroy();
            dt.triggerNext();
        });     
    }

}