import { Component, OnInit } from '@angular/core';
import ITrainer from 'src/app/interfaces/ITrainer';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss'],
})
export class CoachListComponent implements OnInit {
  coachs: ITrainer[] = [];

  constructor(private coachServices: TrainerService) {}

  ngOnInit(): void {}

  added(): void {}

  deleted(coach_nr: number) {}

  edited(coach: ITrainer) {}
}
