import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service'
import {ModalService} from '../../../services/modal.service'
@Component({
  selector: 'app-datasetfilters',
  templateUrl: './filters.component.html',
  styleUrls: ['../../style.scss']
})
export class DatasetFiltersComponent implements OnInit {
  private Categories:any=[]
  private categoryname=''
  private type='checkbox'
  selctedCategory=null;
  constructor(
    private admin:AdminService,
    private modal:ModalService
  ) { }

  ngOnInit() {
    this.admin.getDatasetFilters().subscribe(
      res=>{
      this.Categories=res;
    },
    error=>{
      console.log('error')
    })
  }

  onRadioChange(event){
    this.type=event.target.value;
  }
  addCategory(){
    var data=new FormData()
    data.append('key',this.categoryname)
    data.append('type',this.type)
    this.admin.addDatasetCategory(data).subscribe(res=>{
      this.Categories=res
      this.categoryname=''
      this.type='chekbox'
      this.modal.hide();

    },err=>{
      console.log(err)
    }) 
  }
  delete(id:string){
    this.admin.deleteDatasetCategory(id).subscribe(res=>{
      this.Categories=res;
    },err=>{
      console.log(err)
    })
    
  }
  addCategoryProperty(value:any){
    this.selctedCategory.values.push(value)
    this.modal.hide()
    this.admin.updateDatasetCategory(this.selctedCategory._id,this.selctedCategory).subscribe(res=>{
      this.Categories=res;
    },err=>{
      console.log(err)
    })
  }
  deleteCategoryProperty(item,id:number){
    this.selctedCategory=item
    this.selctedCategory.values.splice(id,1);
    this.admin.updateDatasetCategory(this.selctedCategory._id,this.selctedCategory).subscribe(res=>{
      this.Categories=res;
    },err=>{
      console.log(err)
    })
  }


}
