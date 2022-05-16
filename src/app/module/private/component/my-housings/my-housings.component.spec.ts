import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHousingsComponent } from './my-housings.component';

describe('MyHousingsComponent', () => {
  let component: MyHousingsComponent;
  let fixture: ComponentFixture<MyHousingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHousingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHousingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
