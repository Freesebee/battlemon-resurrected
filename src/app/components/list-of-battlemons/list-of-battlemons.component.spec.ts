import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBattlemonsComponent } from './list-of-battlemons.component';

describe('ListOfBattlemonsComponent', () => {
  let component: ListOfBattlemonsComponent;
  let fixture: ComponentFixture<ListOfBattlemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfBattlemonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBattlemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
