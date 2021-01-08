import { Component, Input, Type, OnInit } from '@angular/core';
import { Control } from 'rete';
import { AngularControl } from 'rete-angular-render-plugin';

@Component({
  selector: 'app-slider-input',
  templateUrl: './slider-input.component.html',
  styleUrls: ['./slider-input.component.css']
})
export class SliderInputComponent  implements OnInit {
  @Input() Title:string
  @Input() value: string;
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() change!: Function;
  @Input() mounted!: Function;
  ngOnInit() {
    this.mounted()
  }
  onChange(value){
    this.change(value)
  }
}

export class SliderControl extends Control implements AngularControl {
  component: Type<SliderInputComponent>
  props:{
      [key:string]:unknown;
  }

  constructor(public emitter, public key,value,min,max,step){
      super(key);
      this.component=SliderInputComponent;
      this.props={
          min,
          max,
          Title:key,
          step,
          value,
          change:v=>this.onChange(v),
          mounted:()=>{
              this.setValue((this.getData(key)as any)||value)
          }
      }
  }
  onChange(val: any) {
    this.setValue(val);
  }
  validate(){
    var result={
      isValid: true,
      message:''
    }
    return result;
  }

  setValue(val: any) {
    this.props.value=val;
    this.putData(this.key, this.props.value)
  }
}
