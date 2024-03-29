import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MediaCardComponent} from './media-card.component';

describe('MediaCardComponent', () => {
  let component: MediaCardComponent;
  let fixture: ComponentFixture<MediaCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
