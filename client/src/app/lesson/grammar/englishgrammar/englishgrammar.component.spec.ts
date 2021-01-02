import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishgrammarComponent } from './englishgrammar.component';

describe('EnglishgrammarComponent', () => {
  let component: EnglishgrammarComponent;
  let fixture: ComponentFixture<EnglishgrammarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnglishgrammarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnglishgrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
