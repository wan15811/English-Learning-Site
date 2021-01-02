import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgrammarComponent } from './listgrammar.component';

describe('ListgrammarComponent', () => {
  let component: ListgrammarComponent;
  let fixture: ComponentFixture<ListgrammarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListgrammarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListgrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
