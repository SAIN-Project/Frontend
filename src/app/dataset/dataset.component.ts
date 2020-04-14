import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import {DatasetService} from '../dataset.service'

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {
  firstload=true;
  filter:FormGroup
  dataSets=null;
  error=null;
  isLoading=false;
  constructor(private dataservice:DatasetService, private router: Router,private formBuilder:FormBuilder) {
    if(this.firstload){
      this.getDatasets()
      this.firstload=false;
    }
    
    this.filter = this.formBuilder.group({
      domain: this.formBuilder.array([]),
      Type:this.formBuilder.array([])  ,
      ProgramingLanguage:this.formBuilder.array([]),
      ArtifactsFormat:this.formBuilder.array([]),
      ArtifactsType: this.formBuilder.array([]),
      OracleDeveloper:this.formBuilder.array([]),
      OracleIsPresent:this.formBuilder.array([]),
      OracleCollections:this.formBuilder.array([]),
      Storage:this.formBuilder.array([]),
      Licensing:this.formBuilder.array([]),
      MultiVersion:this.formBuilder.array([]),
      IndustryRepresntative:this.formBuilder.array([]),
      
    })
   }
 
  ngOnInit() {
    this.isLoading=true


  }
  getDatasets():void{
    this.dataservice.getDatasets().subscribe(
      resData => {
        this.dataSets=resData;
        this.isLoading=false;
      },
      errorMessage => {
        this.error='Undable to fetch the datasets' 
        this.isLoading=false;
      });
  }

  onChange(form:NgForm){
    //alert(JSON.stringify(form.value))
  }

  onCheckboxChange(e) {
    this.isLoading=true
    
    this.updateForms(e)
    this.dataservice.getFilteredData(this.filter.value).subscribe(
      resData => {
        this.dataSets=resData;
        this.isLoading=false;
      },
      errorMessage => {
        this.error='Undable to fetch the datasets' 
        this.isLoading=false;
      });
  }

  updateForms(e){
    const checkArray: FormArray = this.filter.get(e.target.name) as FormArray;
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
  //============Downlod dtaset controler==============
  download(id){
      window.location.href=this.dataservice.url+'/dataset/download/'+id;
  }
  

  

}
