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
  selector: 'app-bug-space',
  templateUrl: './bug-space.component.html',
  styleUrls: ['./bug-space.component.css']
})
export class BugSpaceComponent implements OnInit {
  private dataForm: FormGroup;
  private historyRevision = "History Revision File";
  private structurl_DSM = "DSM File";
  private issues='Jira Bug Files'

  private results=null;
  private submitted = false;
  private isLoading = false;
  private error = null;

  private structurl_DSMFile: File;
  private historyRevisionFile: File;
  private issuesFile:File;
  constructor(private titan: TitanService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      logType: [, Validators.required],
      startDate: [, Validators.required],
      endDate: [, Validators.required],
      regExpkey: [, Validators.required],
      Threshold: [],
      
    });
  }

  get f() {
    return this.dataForm.controls;
  }

  onFileSelected1(event) {
    if (event.target.files.length > 0) {
      this.historyRevisionFile = <File>event.target.files[0];
      this.historyRevision = this.historyRevisionFile.name;
    }
  }
  onFileSelected2(event) {
    if (event.target.files.length > 0) {
      this.structurl_DSMFile = <File>event.target.files[0];
      this.structurl_DSM = this.structurl_DSMFile.name;
    }
  }

  onFileSelected3(event) {
    if (event.target.files.length > 0) {
      this.issuesFile = <File>event.target.files[0];
      this.issues = this.issuesFile.name;
    }
  }

  onSubmit(){
    this.submitted = true;  
    if (!this.dataForm.valid ||!this.historyRevisionFile ||!this.structurl_DSMFile||!this.issuesFile) {
      return;
    }
    const data = new FormData();
    data.append("regExpkey", this.dataForm.get("regExpkey").value);
    data.append("logType", this.dataForm.get("logType").value);
    data.append("startDate", this.dataForm.get("startDate").value);
    data.append("endDate", this.dataForm.get("endDate").value);
    data.append("Threshold", this.dataForm.get("Threshold").value);
    data.append("historyRevisionFile",this.historyRevisionFile,this.historyRevisionFile.name);
    data.append("dsmFile", this.structurl_DSMFile, this.structurl_DSMFile.name);
    data.append("issuesFile", this.issuesFile, this.issuesFile.name);
    
    this.isLoading=true
    this.titan.runBugSpace(data).subscribe(
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
    const filename='bugspace_output.csv'
    window.location.href=this.titan.url+'/engine/download/'+toolname+'/'+filename;
  }

}
