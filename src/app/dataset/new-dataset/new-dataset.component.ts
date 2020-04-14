import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { DatasetService } from '../../dataset.service'
import { HttpEventType} from '@angular/common/http';
import { $ } from 'protractor';
@Component({
  selector: 'app-new-dataset',
  templateUrl: './new-dataset.component.html',
  styleUrls: ['./new-dataset.component.css']
})
export class NewDatasetComponent implements OnInit {
  dataForm: FormGroup;
  selectedFile:File=null
  isLoading=false
  progress:any;
  error=null;
  submitted=false
  filename='Choose Dataset File'
  constructor(private dataservice:DatasetService,private formBuilder:FormBuilder) {
   }


  ngOnInit() {
    
    this.dataForm = this.formBuilder.group({
      name: [, Validators.required],
      domain: [, Validators.required],
      description: [, [Validators.required, Validators.minLength(6)]],
      Type:this.formBuilder.array([])  ,
      ProgramingLanguage:this.formBuilder.array([]),
      ArtifactsFormat:this.formBuilder.array([]),
      ArtifactsType: this.formBuilder.array([]),
      OracleDeveloper:this.formBuilder.array([]),
      OracleIsPresent:[],
      OracleCollections:[],
      OracleSize:[0],
      Storage:[],
      Licensing:[],
      MultiVersion:[],
      IndustryRepresntative:[],
      
    })
  }
  get f(){ return this.dataForm.controls}
  onSubmit(){
    const data= new FormData();
    data.append('name',this.dataForm.get('name').value)
    data.append('domain',this.dataForm.get('domain').value)
    data.append('description',this.dataForm.get('description').value)
    data.append('Type',this.dataForm.get('Type').value)
    data.append('ProgramingLanguage',this.dataForm.get('ProgramingLanguage').value)
    data.append('ArtifactsFormat',this.dataForm.get('ArtifactsFormat').value)
    data.append('ArtifactsType',this.dataForm.get('ArtifactsType').value)
    data.append('OracleDeveloper',this.dataForm.get('OracleDeveloper').value)
    data.append('OracleIsPresent',this.dataForm.get('OracleIsPresent').value)
    data.append('OracleSize',this.dataForm.get('OracleSize').value)
    data.append('Storage',this.dataForm.get('Storage').value)
    data.append('Licensing',this.dataForm.get('Licensing').value)
    data.append('IndustryRepresntative',this.dataForm.get('IndustryRepresntative').value)
    data.append('MultiVersion',this.dataForm.get('MultiVersion').value)
    data.append('OracleCollections',this.dataForm.get('OracleCollections').value)
    if(this.selectedFile){
      data.append('file',this.selectedFile,this.selectedFile.name)
    }
    this.submitted=true;
    if(!this.dataForm.valid ||!this.selectedFile){
      return;
    }
    this.isLoading=true;
    this.dataservice.addDataset(data).subscribe(
      event => {  
        if(event.Type==HttpEventType.UploadProgress){
          this.progress='Uploading Progress:'+Math.round((event.loaded/event.total)*100);
        }else if(event.Type=HttpEventType.Response) {
          this.isLoading=false;
          this.submitted=false
          
        }          
      },
      errorMessage => {
        this.error='Unable to Upload the Dataset' 
        alert(this.error)
        this.isLoading=false;
      });
  }

  
  onCheckboxChange(e) {
    const checkArray: FormArray = this.dataForm.get(e.target.name) as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onFileSelected(event){
    if(event.target.files){
      this.selectedFile=<File>event.target.files[0];
      this.filename=this.selectedFile.name;
    }
  }
   
  


}
