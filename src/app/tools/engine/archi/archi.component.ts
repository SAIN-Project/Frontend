import { Component, OnInit, AfterViewInit, AfterContentInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";

import * as CanvasJS from 'src/assets/js/charts/canvasjs.min.js'
import {DataTableDirective} from'angular-datatables'
import { on } from 'cluster';
import { Subject } from 'rxjs';
import {ArcheiService} from './archei.service'
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-archi',
  templateUrl: './archi.component.html',
  styleUrls: ['./archi.component.css']
})
export class ArchiComponent implements OnInit {
  private dataForm: FormGroup;
  private projectName="Upload Project"
  private project='upload'
  private project_File:File;
  private results=[]
  private error
  private submitted=false
  private isLoading=false
  
  constructor(private archei:ArcheiService,private formBuilder: FormBuilder) { }
  dtOptions: DataTables.Settings = {};
  targets=[3,4,5,6,7,8,9,10,11,12,13,14,15];
  ngOnInit() {
     this.dataForm = this.formBuilder.group({
      threshold: [0.3,]
    });
    
    this.dtOptions = {
      "columnDefs": [ 
                      {targets: this.targets,visible: false} ,
                       {targets: 1,render: function ( data:string, type, row ) {
                         
                         return data.substr( data.lastIndexOf('\\')+1, data.length );
                        }
                      }
                    ] 
    }   
  }


  
  onFileSelected(event){
    if (event.target.files.length > 0) {
      this.project_File = <File>event.target.files[0];
      this.projectName= this.project_File.name;
    }

  }
  onSubmit(){
    alert('submitted')
      
    if (!this.dataForm.valid ||!this.project_File ) {
      return;
    }
    const data = new FormData();
    data.append("threshold", this.dataForm.get("threshold").value);
    data.append("inputproject",this.project_File,this.project_File.name);
    
    this.isLoading=true  
    this.archei.runArchei(data).subscribe(
      resData => {
        this.results=resData;
        this.submitted=true;
        this.isLoading=false;
        this.viewSection('data')
      },
      errorMessage => {
        this.error='Archi may take longer time ..\n we will notify you when the results are ready' 
        this.isLoading=false;
        this.submitted=false
       
      });

  }

  downloadJson(){
    let theJSON = JSON.stringify(this.results);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    element.setAttribute('download', "tactics.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }
  downloadCsv(){
    window.location.href=this.archei.url+'/tools/download/hadoop';
  }



  //--------Events Handler -----------------//
  viewType='data'
  viewSection(type){
    if(type=='data'){
      $("#chart").css("display","none")
      $("#data").css("display","flex")
    }else{
      $("#data").css("display","none") 
      $("#chart").css("display","block")    
    }
    
    this.viewType=type
    var low=[],medium=[],high=[];
    var columnsArray=['ActiveRedundancy',
                      'Audit',
                      'Authenticate',
                      'CheckPoint',
                      'HeartBeat',
                      'Kerbrose',
                      'LoadBalancing',
                      'PBAC',
                      'PingEcho',
                      'Pooling',
                      'RBAC',
                      'Scheduler',
                      'Session',
                      'ValidationInterceptor']
                    
    
    if(type=='chart'){
      var table = $('#dtResults').DataTable();
      
      var columns = table.columns;
        for(var i=2;i<15;i++){
            var length = table.column(i).data().filter( function ( value, index ) {
                return (value > 0.2 && value<0.4)? true : false;
            } ).length;
            low.push({y:length,label:columnsArray[i-2]})

            length=table.column(i).data().filter( function ( value, index ) {
                return (value >= 0.4 && value<0.6)? true : false;
            } ).length;
            medium.push({y:length,label:columnsArray[i-2]})

            length=table.column(i).data().filter( function ( value, index ) {
              return (value>=0.6)? true : false;
            } ).length;
            high.push({y:length,label:columnsArray[i-2]})
            
        }  
        this.initializeChart(low,medium,high)
    }  
  }

  onRadioChange(event){
    this.project=event.target.value
  }
  onCheckboxChange(id:number,event){
    const i=this.targets.indexOf(id)
    if(i!=-1) this.targets.splice(i,1)
    else this.targets.push(id)
    var table = $('#dtResults').DataTable();
    table.column(id).visible(event.target.checked);
    table.draw()

  }

  initializeChart(low,medium,high){
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Tactics Data Analysis",
        fontFamily: "arial black",
        fontColor: "#695A42"
      },
      axisX: {
        interval: 1,
        intervalType: "Tactic"
      },
      axisY:{
        valueFormatString:"#0F",
        gridColor: "#B6B1A8",
        tickColor: "#B6B1A8"
      },
      toolTip: {
        shared: true,
        content: toolTipContent
      },
      data: [{
        type: "stackedColumn",
        showInLegend: true,
        color: "#ea1b25",
        name: "Low",
        dataPoints: low
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "Medium",
          color: "#0787ea",
          dataPoints: medium
        },
        {        
          type: "stackedColumn",
          showInLegend: true,
          name: "High",
          color: "#a3d133",
          dataPoints: high
        }]
    });
    chart.render();
    function toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2, str3;
    for (var i = 0; i < e.entries.length; i++){
      var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: <strong>"+e.entries[i].dataPoint.y+"</strong>&nbsp File<br/>";
      total = e.entries[i].dataPoint.y + total;
      str = str.concat(str1);
    }
    str2 = "<span style = \"color:DodgerBlue;\"><strong>"+e.entries[0].dataPoint.label+"</strong></span><br/>";
    total = Math.round(total * 100) / 100;
    str3 = "<span style = \"color:Tomato\">Total:</span><strong> "+total+"</strong>&nbsp File<br/>";
    return (str2.concat(str)).concat(str3);
  }

}   
}
