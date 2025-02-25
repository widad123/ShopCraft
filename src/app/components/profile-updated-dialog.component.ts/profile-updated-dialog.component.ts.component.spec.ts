import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUpdatedDialogComponentTsComponent } from './profile-updated-dialog.component.ts.component';

describe('ProfileUpdatedDialogComponentTsComponent', () => {
  let component: ProfileUpdatedDialogComponentTsComponent;
  let fixture: ComponentFixture<ProfileUpdatedDialogComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUpdatedDialogComponentTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUpdatedDialogComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
