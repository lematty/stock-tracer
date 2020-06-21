import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchColumnsModalComponent } from './match-columns-modal.component';

describe('MatchColumnsModalComponent', () => {
  let component: MatchColumnsModalComponent;
  let fixture: ComponentFixture<MatchColumnsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchColumnsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchColumnsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
