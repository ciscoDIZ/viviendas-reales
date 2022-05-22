import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingByOwnerComponent } from './housing-by-owner.component';

describe('HousingByOwnerComponent', () => {
  let component: HousingByOwnerComponent;
  let fixture: ComponentFixture<HousingByOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingByOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingByOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
