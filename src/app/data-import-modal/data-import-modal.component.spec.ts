import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataImportModalComponent } from './data-import-modal.component';

describe('DataImportModalComponent', () => {
  let component: DataImportModalComponent;
  let fixture: ComponentFixture<DataImportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataImportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataImportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
