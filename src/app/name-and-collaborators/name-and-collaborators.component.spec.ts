import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAndCollaboratorsComponent } from './name-and-collaborators.component';

describe('NameAndCollaboratorsComponent', () => {
  let component: NameAndCollaboratorsComponent;
  let fixture: ComponentFixture<NameAndCollaboratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameAndCollaboratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAndCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
