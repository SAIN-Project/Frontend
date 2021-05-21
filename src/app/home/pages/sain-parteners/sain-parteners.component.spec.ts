import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SainPartenersComponent } from './sain-parteners.component';

describe('SainPartenersComponent', () => {
  let component: SainPartenersComponent;
  let fixture: ComponentFixture<SainPartenersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SainPartenersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SainPartenersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
