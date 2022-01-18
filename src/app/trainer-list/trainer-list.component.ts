import { Component, Inject, Input, OnInit } from '@angular/core';
import ITrainer from '../interfaces/ITrainer';
import { TrainerService } from '../services/trainer.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TrainerAddComponent } from '../trainer-add/trainer-add.component';
import { TrainerEditComponent } from '../trainer-edit/trainer-edit.component';
import { compileResults } from '@angular/compiler-cli/src/ngtsc/annotations/src/util';
import { resolve } from '@angular/compiler-cli';
import { PokemonTableComponent } from '../pokemon-table/pokemon-table.component';
import IBattlemon from '../interfaces/IBattlemon';
import ITrainerBattlemon from '../interfaces/ITrainerBattlemon';
import ITrainerWithBattlemons from '../interfaces/ITrainerWithBattlemons';
import { BattlemonService } from '../services/battlemon.service';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss'],
})
export class TrainerListComponent implements OnInit {
  @Input() trainers!: ITrainerWithBattlemons[];
  battlemonOne?: IBattlemon;
  battlemonTwo?: IBattlemon;
  battlemonThree?: IBattlemon;
  constructor(
    private trainerService: TrainerService,
    private battlemonService: BattlemonService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data1: any,
    public dialogPost: MatDialogRef<TrainerListComponent>
  ) {}

  ngOnInit(): void {
    this.everyTrainers();
  }

  setBattlemonSlot(slot: number, trainerId: number) {
    throw 'Not Implemented';
  }

  everyTrainers() {
    this.trainerService.GetAllTrainers().subscribe({
      next: (trainerArray: ITrainer[]) => {
        this.trainers = [];

        trainerArray.forEach((trainer) => {
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

          this.trainers.push(t);
        });
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  createDialog(trainer?: ITrainer): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.data = { name: '', gender: true, taunt_text: '' };

    const dialogRefernece = this.dialog.open(TrainerAddComponent, dialogConf);
    dialogRefernece.afterClosed().subscribe((result) => {
      if (!(result == undefined)) {
        this.TrainerNewCreation(result);
      }
    });
  }

  editDialog(trainer: ITrainer): void {
    const dialogueConfig = new MatDialogConfig();
    dialogueConfig.data = {
      id: trainer.id,
      name: trainer.name,
      gender: trainer.gender,
      taunt_text: trainer.taunt_text,
    };
    const dialogRef = this.dialog.open(TrainerEditComponent, dialogueConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.trainerEdition(result);
    });
  }

  TrainerNewCreation(newTrainer: ITrainer) {
    this.trainerService.CreateTrainer(newTrainer).subscribe({
      next: (result: any) => {
        this.trainers.push(result);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  trainerEdition(editedTrainer: ITrainer) {
    this.trainerService.UpdateTrainer(editedTrainer).subscribe({
      next: (result: any) => {
        const trainerIndex = this.trainers.findIndex((i) => i.id == result.id);
        this.trainers[trainerIndex] = result;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  trainerRemove(trainerRemoveId: number) {
    this.trainerService.DeleteTrainer(trainerRemoveId).subscribe({
      next: (result: any) => {
        var trainerIndex = this.trainers.findIndex(
          (i) => i.id == trainerRemoveId
        );
        this.trainers.splice(trainerIndex, 1);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  exit() {
    this.dialogPost.close();
  }
  closeClash(trainer: ITrainer) {
    this.dialogPost.close(trainer);
  }

  choosePoks() {
    const dialogChosePoks = new MatDialogConfig();
    const dialogPoks = this.dialog.open(PokemonTableComponent, dialogChosePoks);
    dialogPoks.afterClosed().subscribe((result) => {
      this.pokemonOneChoosing(result);
    });
  }

  choosePoks2() {
    const dialogChosePoks2 = new MatDialogConfig();
    const dialogPoks2 = this.dialog.open(
      PokemonTableComponent,
      dialogChosePoks2
    );
    dialogPoks2.afterClosed().subscribe((result) => {
      this.pokemonTwoChoosing(result);
    });
  }

  choosePoks3() {
    const dialogChosePoks3 = new MatDialogConfig();
    const dialogPoks3 = this.dialog.open(
      PokemonTableComponent,
      dialogChosePoks3
    );
    dialogPoks3.afterClosed().subscribe((result) => {
      this.pokemonThreeChoosing(result);
    });
  }
  pokemonOneChoosing(battlemon: IBattlemon) {
    this.battlemonOne = battlemon;
  }
  pokemonTwoChoosing(battlemon: IBattlemon) {
    this.battlemonTwo = battlemon;
  }
  pokemonThreeChoosing(battlemon: IBattlemon) {
    this.battlemonThree = battlemon;
  }
}
