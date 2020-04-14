import { Component, OnInit } from "@angular/core";
import { TitanService} from '../../titan.service'
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-hdsm",
  templateUrl: "./hdsm.component.html",
  styleUrls: ["./hdsm.component.css"]
})
export class HDSMComponent implements OnInit {
  private dataForm: FormGroup;
  private historyRevision = "History Revision File";
  private structurl_DSM = "DSM File";

  private results=null;
  private submitted = false;
  private isLoading = false;
  private error = null;

  private historyRevisionFile: File;
  private structurl_DSMFile: File;

  

  constructor(private titan: TitanService,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      logType: [, Validators.required],
      startDate: [, Validators.required],
      endDate: [, Validators.required]
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

  onSubmit() {
    
    if (
      !this.dataForm.valid ||
      !this.historyRevisionFile ||
      !this.structurl_DSMFile
    ) {
      return;
    }
    const data = new FormData();
    data.append("logType", this.dataForm.get("logType").value);
    data.append("startDate", this.dataForm.get("startDate").value);
    data.append("endDate", this.dataForm.get("endDate").value);
    data.append(
      "historyRevisionFile",
      this.historyRevisionFile,
      this.historyRevisionFile.name
    );
    data.append("dsmFile", this.structurl_DSMFile, this.structurl_DSMFile.name);
    this.submitted = true;
    this.isLoading=true
    this.titan.runHdsm(data).subscribe(
      resData => {
        this.results=resData;
        console.log(this.results)
        this.isLoading=false;
      },
      errorMessage => {
        console.log(errorMessage)
        this.error='Unable to run HDSM file from the server' 
        this.isLoading=false;
      });
    
  }

  downloadResults(){
    const toolname='Titan'
    const filename='hdsm_output.dsm'
    window.location.href=this.titan.url+'/engine/download/'+toolname+'/'+filename;
  }
}
