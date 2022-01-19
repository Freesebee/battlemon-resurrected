import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import IBattlemon from 'src/app/interfaces/IBattlemon';
import ITrainer from 'src/app/interfaces/ITrainer';
import ITrainerBattlemon from 'src/app/interfaces/ITrainerBattlemon';
import ITrainerWithBattlemons from 'src/app/interfaces/ITrainerWithBattlemons';
import { BattlemonService } from 'src/app/services/battlemon.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;

  trainer1!: ITrainerWithBattlemons;
  trainer2!: ITrainerWithBattlemons;
  
  tr1ActiveBattlemon: number = 0;
  tr2ActiveBattlemon: number = 0;

  tr1ActiveBattlemonHp: number = 0;
  tr2ActiveBattlemonHp: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private trainerService: TrainerService,
    private battlemonService: BattlemonService,
  ) {
    
  }

  ngOnInit(): void {

    const routeParams = this._route.snapshot.paramMap

    this.trainerService.GetTrainerById(Number(routeParams.get('tr1id'))).subscribe({
      next: (trainer: ITrainer) => {
        const t: ITrainerWithBattlemons = {
          id: trainer.id,
          name: trainer.name,
          gender: trainer.gender,
          matches_lost: trainer.matches_lost,
          matches_won: trainer.matches_won,
          taunt_text: trainer.taunt_text,
          battlemonSlots: [],
        };

        this.trainerService.GetTrainerBattlemons(trainer.id).subscribe({
          next: (trainerBattlemonArray: ITrainerBattlemon[]) => {
            if (trainerBattlemonArray && trainerBattlemonArray.length > 0) {
              trainerBattlemonArray.forEach(
                (battlemon: ITrainerBattlemon) => {
                  this.battlemonService
                    .GetBattlemonById(battlemon.battlemon_id)
                    .subscribe({
                      next: (data: IBattlemon) => {
                        t.battlemonSlots.push(data);
                      },
                      error: (error: any) => {
                        console.error(error);
                      },
                    });
                }
              );
            }
          },
          error: (error: any) => {
            console.error(error);
          },
        });

        this.trainer1 = t
      },
      error: (error: any) => {
        console.error(error);
      },
    })

    this.trainerService.GetTrainerById(Number(routeParams.get('tr2id'))).subscribe({
      next: (trainer: ITrainer) => {
        const t: ITrainerWithBattlemons = {
          id: trainer.id,
          name: trainer.name,
          gender: trainer.gender,
          matches_lost: trainer.matches_lost,
          matches_won: trainer.matches_won,
          taunt_text: trainer.taunt_text,
          battlemonSlots: [],
        };

        this.trainerService.GetTrainerBattlemons(trainer.id).subscribe({
          next: (trainerBattlemonArray: ITrainerBattlemon[]) => {
            if (trainerBattlemonArray && trainerBattlemonArray.length > 0) {
              trainerBattlemonArray.forEach(
                (battlemon: ITrainerBattlemon) => {
                  this.battlemonService
                    .GetBattlemonById(battlemon.battlemon_id)
                    .subscribe({
                      next: (data: IBattlemon) => {
                        t.battlemonSlots.push(data);
                      },
                      error: (error: any) => {
                        console.error(error);
                      },
                    });
                }
              );
            }
          },
          error: (error: any) => {
            console.error(error);
          },
        });

        this.trainer2 = t
      },
      error: (error: any) => {
        console.error(error);
      },
    })

    _initWebWorker()
  }
}

function _initWebWorker() {

  if (typeof Worker !== 'undefined') {
    // Create a new
    const worker = new Worker(new URL('./battle.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      console.log(`page got message: ${data}`);
    };
    worker.postMessage('hello');
  } else {
    // Web Workers are not supported in this environment.
    // You should add a fallback so that your program still executes correctly.
  }
}