import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadHousingImageComponent } from './upload-housing-image.component';

describe('UploadHousingImageComponent', () => {
  let component: UploadHousingImageComponent;
  let fixture: ComponentFixture<UploadHousingImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadHousingImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadHousingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
