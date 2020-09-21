import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSeriesComponent } from './other-series.component';

describe('OtherSeriesComponent', () => {
  let component: OtherSeriesComponent;
  let fixture: ComponentFixture<OtherSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
