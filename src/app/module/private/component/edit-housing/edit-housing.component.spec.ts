import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHousingComponent } from './edit-housing.component';

describe('EditHousingComponent', () => {
  let component: EditHousingComponent;
  let fixture: ComponentFixture<EditHousingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHousingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
