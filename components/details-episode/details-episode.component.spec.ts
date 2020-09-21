import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEpisodeComponent } from './details-episode.component';

describe('DetailsEpisodeComponent', () => {
  let component: DetailsEpisodeComponent;
  let fixture: ComponentFixture<DetailsEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsEpisodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
