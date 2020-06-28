import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFileTypeComponent } from './choose-file-type.component';

describe('ChooseFileTypeComponent', () => {
  let component: ChooseFileTypeComponent;
  let fixture: ComponentFixture<ChooseFileTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseFileTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFileTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
