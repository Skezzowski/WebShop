import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersPageComponent } from './manage-users-page.component';

describe('ManageUsersTableComponent', () => {
  let component: ManageUsersPageComponent;
  let fixture: ComponentFixture<ManageUsersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUsersPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
