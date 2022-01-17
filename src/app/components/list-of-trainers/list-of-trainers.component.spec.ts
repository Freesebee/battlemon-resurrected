import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTrainersComponent } from './list-of-trainers.component';

describe('ListOfTrainersComponent', () => {
  let component: ListOfTrainersComponent;
  let fixture: ComponentFixture<ListOfTrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTrainersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
