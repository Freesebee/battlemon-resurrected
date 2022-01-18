import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerEditComponent } from './trainer-edit.component';

describe('TrainerEditComponent', () => {
  let component: TrainerEditComponent;
  let fixture: ComponentFixture<TrainerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
