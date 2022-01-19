import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import IBattlemon from 'src/app/interfaces/IBattlemon';
import ITrainer from 'src/app/interfaces/ITrainer';
import ITrainerBattlemon from 'src/app/interfaces/ITrainerBattlemon';
import ITrainerWithBattlemons from 'src/app/interfaces/ITrainerWithBattlemons';
import { BattlemonService } from 'src/app/services/battlemon.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { BattleResultComponent } from '../battle-result/battle-result.component';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  animations: [
    trigger('test', [
      // state()
      transition('void => *', [
        style({}), //css properties
        animate(2000, style({})),
      ]),
    ]),
  ],
})
export class BattleComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;

  isTrainer1Turn: boolean = true;

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
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    const routeParams = this._route.snapshot.paramMap;

    this.trainerService
      .GetTrainerById(Number(routeParams.get('tr1id')))
      .subscribe({
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
                          if (t.battlemonSlots.length == 1)
                            this.tr1ActiveBattlemonHp = data.hp;
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

          this.trainer1 = t;
        },
        error: (error: any) => {
          console.error(error);
        },
      });

    this.trainerService
      .GetTrainerById(Number(routeParams.get('tr2id')))
      .subscribe({
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
                          if (t.battlemonSlots.length == 1)
                            this.tr2ActiveBattlemonHp = data.hp;
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

          this.trainer2 = t;
        },
        error: (error: any) => {
          console.error(error);
        },
      });

    this._initWebWorker();
  }

  private worker?: Worker;

  _initWebWorker() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker(new URL('./battle.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this._update(data);
      };
      this.worker.postMessage('start');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  _update(data: any) {
    // this.playAudio()
    if (this.isTrainer1Turn) {
      this.isTrainer1Turn = !this.isTrainer1Turn;

      let dmg = this.trainer1?.battlemonSlots[this.tr1ActiveBattlemon].dmg;
      if (
        Math.random() <
        this.trainer1?.battlemonSlots[this.tr1ActiveBattlemon].crit_chance / 100
      ) {
        dmg *= 1.5;
      }
      this.tr2ActiveBattlemonHp -= dmg;

      if (this.tr2ActiveBattlemonHp <= 0) {
        if (this.tr2ActiveBattlemon < this.trainer2.battlemonSlots.length) {
          this.tr2ActiveBattlemon++;
          this.tr2ActiveBattlemonHp =
            this.trainer2.battlemonSlots[this.tr2ActiveBattlemon].hp;
        } else {
          //tr1 won
          this.winMatch(true);
        }
      }
    } else {
      this.isTrainer1Turn = !this.isTrainer1Turn;

      let dmg = this.trainer2?.battlemonSlots[this.tr2ActiveBattlemon].dmg;
      if (
        Math.random() <
        this.trainer2?.battlemonSlots[this.tr2ActiveBattlemon].crit_chance / 100
      ) {
        dmg *= 1.5;
      }
      this.tr1ActiveBattlemonHp -= dmg;

      if (this.tr1ActiveBattlemonHp <= 0) {
        if (this.tr1ActiveBattlemon < this.trainer1.battlemonSlots.length) {
          this.tr1ActiveBattlemon++;
          this.tr1ActiveBattlemonHp =
            this.trainer1.battlemonSlots[this.tr1ActiveBattlemon].hp;
        } else {
          //tr2 won
          this.winMatch(false);
        }
      }
    }
  }

  playAudio() {
    let audio = new Audio();
    audio.src = '../../../assets/audio/alarm.wav';
    audio.load();
    audio.play();
  }

  winMatch(tr1won: boolean) {
    this.worker?.postMessage('stop');
    //throw 'Not Implemeneted -> Requires navigating to results view';
    this.openResultDialog(tr1won);



  }

  openResultDialog(tr1won: boolean): void {

    const dialogConfigTable = new MatDialogConfig();
    if(tr1won == true)
      dialogConfigTable.data = {firstWon:tr1won,trainerThatWon:this.trainer1};
    else
      dialogConfigTable.data = {firstWon:tr1won,trainerThatWon:this.trainer2};
    const dialogRefTable = this.dialog.open(BattleResultComponent, dialogConfigTable);

    dialogRefTable.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
