import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGrammarComponent } from './update-grammar.component';

describe('UpdateGrammarComponent', () => {
  let component: UpdateGrammarComponent;
  let fixture: ComponentFixture<UpdateGrammarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGrammarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
