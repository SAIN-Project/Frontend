
import { Component, ChangeDetectorRef } from '@angular/core';
import { NodeComponent, NodeService } from 'rete-angular-render-plugin';
@Component({
  templateUrl: './node-biulder.component.html',
  styleUrls: ['./node-biulder.component.css','node.sass'],
  providers: [NodeService]
})
export class NodeBiulderComponent extends NodeComponent  {
  public max:boolean=true;
  constructor(protected service: NodeService,protected cdr: ChangeDetectorRef) { 
    super(service, cdr);
  }

  onMinimizeMaximize(){
    this.max=!this.max;
    this.editor.view.resize()
 
  }

}
