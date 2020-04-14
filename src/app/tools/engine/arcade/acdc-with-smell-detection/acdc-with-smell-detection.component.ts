import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";

@Component({
  selector: 'app-acdc-with-smell-detection',
  templateUrl: './acdc-with-smell-detection.component.html',
  styleUrls: ['./acdc-with-smell-detection.component.css']
})
export class AcdcWithSmellDetectionComponent implements OnInit {
  private dataForm: FormGroup;
  private project="Select Project";
  private language="Java";

  private projectFile:File;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      language: ['java', Validators.required],
      classpath: ['', Validators.required],     
    });
  }
  onRadioChange(language){
    this.language=language;
  }
  onFileSelected1(event){
    if (event.target.files.length > 0) {
      this.projectFile = <File>event.target.files[0];
      this.project= this.projectFile.name;
    }

  }

}
