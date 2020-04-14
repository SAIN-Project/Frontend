import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { TitanService} from '../../titan.service'

@Component({
  selector: 'app-sdsm',
  templateUrl: './sdsm.component.html',
  styleUrls: ['./sdsm.component.css']
})
export class SDSMComponent implements OnInit {
  private dataForm: FormGroup;
  private cytoscapePath="Cyto Scape Path"
  private SelectedFile:File;
  private submitted=false;
  private isLoading=false;
  private results=null;
  private error=null;
  constructor(private titan: TitanService,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.dataForm=this.formBuilder.group({
      prefix:[''],
      xprefix:['']
    })
  }

  onFileSelected(event){
    if(event.target.files.length>0){
      this.SelectedFile=<File>event.target.files[0];
      this.cytoscapePath=this.SelectedFile.name;
    }

  }
  onSubmit(){
    this.submitted=true;
    if(!this.dataForm.valid ||!this.SelectedFile){
      return;
    }
    const data= new FormData();
    data.append('prefix',this.dataForm.get('prefix').value)
    data.append('xprefix',this.dataForm.get('xprefix').value)
    data.append('file',this.SelectedFile,this.SelectedFile.name)
    this.isLoading=true;
    this.titan.runSdsm(data).subscribe(
      resData => {
        this.results=resData;
        console.log(resData)
        this.submitted=true;
        this.isLoading=false;
      },
      errorMessage => {
        this.error='Unable to run SDSM file from the server' 
        alert(this.error)
        this.isLoading=false;
      });


  }

  downloadResults(){
    const toolname='Titan'
    const filename='sdsm_output.dsm'
    window.location.href=this.titan.url+'/engine/download/'+toolname+'/'+filename;
  }


}
