import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewvocabComponent } from './newvocab.component';

describe('NewvocabComponent', () => {
  let component: NewvocabComponent;
  let fixture: ComponentFixture<NewvocabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewvocabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewvocabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
