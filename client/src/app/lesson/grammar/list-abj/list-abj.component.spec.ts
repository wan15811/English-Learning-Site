import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbjComponent } from './list-abj.component';

describe('ListAbjComponent', () => {
  let component: ListAbjComponent;
  let fixture: ComponentFixture<ListAbjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAbjComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
