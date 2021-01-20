import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVocabComponent } from './view-vocab.component';

describe('ViewVocabComponent', () => {
  let component: ViewVocabComponent;
  let fixture: ComponentFixture<ViewVocabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVocabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVocabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
