import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewgrammarComponent } from './newgrammar.component';

describe('NewgrammarComponent', () => {
  let component: NewgrammarComponent;
  let fixture: ComponentFixture<NewgrammarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewgrammarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewgrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
