import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss'],
})
export class TrainerListComponent implements OnInit {

  @Input() trainers!: ITrainerWithBattlemons[];

  columns: any[] = ['name','gender', 'matches_won', 'matches_lost', 'taunt_text', 'operations','chose_pokemons' ];
  dataSource!: MatTableDataSource<ITrainerWithBattlemons>;
  battlemonOne?: IBattlemon;
  battlemonTwo?: IBattlemon;
  battlemonThree?: IBattlemon;

  @ViewChild(MatSort, {static:true}) sort!: MatSort;

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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { isTrainerCall: true };

    const dialogPoks = this.dialog.open(
      PokemonTableComponent,
      dialogConfig
    );

    dialogPoks.afterClosed().subscribe((chosen: IBattlemon) => {
      this.trainerService.GetTrainerBattlemons(trainerId).subscribe({
        next: (array: ITrainerBattlemon[]) => {
          const replacedBattlemon = array.find(
            (b) =>
              b.id == this.trainers.find((t) => t.id == trainerId)?.battlemonSlots[slot].id
          );

          if (replacedBattlemon) {
            this.trainerService
              .RemoveTrainerBattlemon(replacedBattlemon?.id!)
              .subscribe({
                next: () => {
                  this._addTrainerBattlemonToDB(trainerId, chosen.id);
                },
                error: (error: any) => {
                  console.error(error);
                },
              });
          } else {
            this._addTrainerBattlemonToDB(trainerId, chosen.id);
          }
        },
        error: (error: any) => {
          console.error(error);
        },
      });

      const slots = this.trainers.find(
        (t) => t.id == trainerId
      )?.battlemonSlots;
      if (slots) slots[slot] = chosen;
    });
  }

  _addTrainerBattlemonToDB(trainerId: number, battlemonId: number) {
    const chosenBattlemon: ITrainerBattlemon = {
      id: 0,
      battlemon_id: battlemonId,
      trainer_id: trainerId,
    };

    this.trainerService.AddTrainerBattlemon(chosenBattlemon).subscribe({
      next: () => {},
      error: (error: any) => {
        console.error(error);
      },
    });
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
        this.dataSource = new MatTableDataSource(this.trainers)
        this.dataSource.sort = this.sort;

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
      matches_won: trainer.matches_won,
      matches_lost: trainer.matches_lost,

    };
    const dialogRef = this.dialog.open(TrainerEditComponent, dialogueConfig);

    dialogRef.afterClosed().subscribe((result) => {
      this.trainerEdition(result);
    });
  }

  TrainerNewCreation(newTrainer: ITrainer) {
    this.trainerService.CreateTrainer(newTrainer).subscribe({
      next: (result:any) => {
        this.trainers.push(result)
        this.everyTrainers();

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
        this.everyTrainers();

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
        this.everyTrainers();

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

  applyFilter(event: any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
