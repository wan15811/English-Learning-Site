import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabcateComponent } from './vocabcate.component';

describe('VocabcateComponent', () => {
  let component: VocabcateComponent;
  let fixture: ComponentFixture<VocabcateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocabcateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
