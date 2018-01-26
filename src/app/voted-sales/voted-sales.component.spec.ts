import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotedSalesComponent } from './voted-sales.component';

describe('VotedSalesComponent', () => {
  let component: VotedSalesComponent;
  let fixture: ComponentFixture<VotedSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotedSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotedSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
