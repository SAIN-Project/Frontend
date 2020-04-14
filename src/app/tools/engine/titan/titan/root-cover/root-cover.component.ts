import { Component, OnInit } from '@angular/core';
import { TitanService} from '../../titan.service'
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";

@Component({
  selector: 'app-root-cover',
  templateUrl: './root-cover.component.html',
  styleUrls: ['./root-cover.component.css']
})
export class RootCoverComponent implements OnInit {
  private dataForm: FormGroup;
  
  private structurl_DSM = "SDSM File";
  private history_HDSM="HDSM File"
  private bugspace="Bug Space File"


  private results=null;
  private submitted = false;
  private isLoading = false;
  private error = null;

  private structurl_DSMFile: File;
  private history_DSMFile: File;
  private bugSpaceFile:File;
  constructor(private titan: TitanService,private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      bugFreq: [1, Validators.required],
      percent: [0, Validators.required],

      
    });
  }

  onFileSelected1(event){
    if (event.target.files.length > 0) {
      this.structurl_DSMFile = <File>event.target.files[0];
      this.structurl_DSM= this.structurl_DSMFile.name;
    }

  }
  onFileSelected2(event){
    if (event.target.files.length > 0) {
      this.history_DSMFile = <File>event.target.files[0];
      this.history_HDSM = this.history_DSMFile.name;
    }

  }
  onFileSelected3(event){
    if (event.target.files.length > 0) {
      this.bugSpaceFile = <File>event.target.files[0];
      this.bugspace = this.bugSpaceFile.name;
    }
  }


  onSubmit(){
    this.submitted = true;  
    if (!this.dataForm.valid ||!this.history_DSMFile ||!this.structurl_DSMFile||!this.bugSpaceFile) {
      return;
    }
    const data = new FormData();
    data.append("percent", this.dataForm.get("percent").value);
    data.append("bugFreq", this.dataForm.get("bugFreq").value);
    data.append("historyFile",this.history_DSMFile,this.history_DSMFile.name);
    data.append("dsmFile", this.structurl_DSMFile, this.structurl_DSMFile.name);
    data.append("bugspaceFile", this.bugSpaceFile, this.bugSpaceFile.name);
    
    this.isLoading=true
    this.titan.runRootCover(data).subscribe(
      resData => {
        this.results=resData;
        console.log(this.results)
        this.isLoading=false;
      },
      errorMessage => {
        console.log(errorMessage)
        this.error='Unable to runBug Space from the server' 
        this.isLoading=false;
      });
  }

  downloadResults(){
    const toolname='Titan'
    const filename='rootcover.zip'
    window.location.href=this.titan.url+'/engine/download/'+toolname+'/'+filename;
  }


}
