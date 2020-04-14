import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ToolService } from './tool.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  firstload=true;
  filter:FormGroup
  tools=null;
  error=null;
  isLoading=false;
  constructor(private toolservice: ToolService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(this.firstload){
      this.getTools()
      this.firstload=false;
    }
      this.filter = this.formBuilder.group({
      Type: this.formBuilder.array([]),
      ProgramingLanguage: this.formBuilder.array([]),
      category: this.formBuilder.array([]),
      ArtifactsType: this.formBuilder.array([]),
    })
  }
  getTools(){
      this.toolservice.getTools().subscribe(
      resData => {
        this.tools=resData;
        this.isLoading=false;
      },
      errorMessage => {
        this.error='Undable to load the Tools' 
        this.isLoading=false;
      });

  }

  onCheckboxChange(e) {
    this.isLoading=true
    
    this.updateForms(e)
    this.toolservice.getFilteredTools(this.filter.value).subscribe(
      resData => {
        this.tools=resData;
        this.isLoading=false;
      },
      errorMessage => {
        this.error='Undable to load the Tools' 
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
  docker(name:string){
    window.open('https://hub.docker.com/repository/docker/ibrahimidn/'+name.toLowerCase())
  }
    //============Downlod dtaset controler==============
  download(toolname){
    window.location.href=this.toolservice.url+'/tools/downloadtool/'+toolname;
  }

}
