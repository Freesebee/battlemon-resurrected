import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerAddComponent } from './trainer-add.component';

describe('TrainerAddComponent', () => {
  let component: TrainerAddComponent;
  let fixture: ComponentFixture<TrainerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
