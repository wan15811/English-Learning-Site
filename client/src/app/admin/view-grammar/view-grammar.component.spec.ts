import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGrammarComponent } from './view-grammar.component';

describe('ViewGrammarComponent', () => {
  let component: ViewGrammarComponent;
  let fixture: ComponentFixture<ViewGrammarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGrammarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
