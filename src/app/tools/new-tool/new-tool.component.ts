import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToolService } from '../tool.service';

@Component({
  selector: 'app-new-tool',
  templateUrl: './new-tool.component.html',
  styleUrls: ['./new-tool.component.css']
})
export class NewToolComponent implements OnInit {
  toolForm: FormGroup;
  selectedFile: File = null
  isLoading = false
  progress: any;
  error = null;
  submitted = false
  filename = 'Choose Dataset File'
  constructor(private toolservice: ToolService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.toolForm = this.formBuilder.group({
      name: [, Validators.required],
      description: [, [Validators.required, Validators.minLength(6)]],
      Type: this.formBuilder.array([]),
      ProgramingLanguage: this.formBuilder.array([]),
      category: this.formBuilder.array([]),
      ArtifactsType: this.formBuilder.array([]),
    })
  }
  get f() { return this.toolForm.controls }
  onSubmit() {
    alert('submitted')
    const data = new FormData();
    data.append('name', this.toolForm.get('name').value)
    data.append('description', this.toolForm.get('description').value)
    data.append('Type', this.toolForm.get('Type').value)
    data.append('ProgramingLanguage', this.toolForm.get('ProgramingLanguage').value)
    data.append('ArtifactsType', this.toolForm.get('ArtifactsType').value)
    data.append('category', this.toolForm.get('category').value)


    if (this.selectedFile) {
      data.append('file', this.selectedFile, this.selectedFile.name)
    }
    this.submitted = true;
    this.isLoading = true;
    this.toolservice.addTool(data).subscribe(
      event => {
        if (event.Type == HttpEventType.UploadProgress) {
          this.progress = 'Uploading Progress:' + Math.round((event.loaded / event.total) * 100);
        } else if (event.Type = HttpEventType.Response) {
          this.isLoading = false;
          this.submitted = false

        }
      },
      errorMessage => {
        this.error = 'Unable to Upload the Dataset'
        alert(this.error)
        this.isLoading = false;
      });
    alert(data.get('ArtifactsType'))
  }
  onCheckboxChange(e) {
    const checkArray: FormArray = this.toolForm.get(e.target.name) as FormArray;
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

  onCancel() {
    alert('cancelled')
  }

}
