import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteAdminPageComponent } from './vote-admin-page.component';

describe('VoteAdminPageComponent', () => {
  let component: VoteAdminPageComponent;
  let fixture: ComponentFixture<VoteAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
