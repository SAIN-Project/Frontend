import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeBiulderComponent } from './node-biulder.component';

describe('NodeBiulderComponent', () => {
  let component: NodeBiulderComponent;
  let fixture: ComponentFixture<NodeBiulderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeBiulderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeBiulderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
