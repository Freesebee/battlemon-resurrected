import {Component, Inject, Input, OnInit} from '@angular/core';
import ITrainer from "../interfaces/ITrainer";
import {TrainerService} from "../services/trainer.service";
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TrainerAddComponent} from "../trainer-add/trainer-add.component";
import {TrainerEditComponent} from "../trainer-edit/trainer-edit.component";
import {compileResults} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";
import {resolve} from "@angular/compiler-cli";



@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss']
})
export class TrainerListComponent implements OnInit {

  @Input() trainers!: ITrainer[]
  constructor(
    private trainerService: TrainerService,
    public dialog: MatDialog,
    public dialogPost: MatDialogRef<TrainerListComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any

  ) { }

  ngOnInit(): void {
    this.everyTrainers();
  }
  everyTrainers() {
    this.trainerService.GetAllTrainers().subscribe({
      next: (result:any) => {
        //console.log(result)
        this.trainers = result;
      },
      error: (error:any) => {
        console.error(error)
      }
    })
  }

  createDialog(trainer?: ITrainer):void {
    const dialogConf = new MatDialogConfig();
    dialogConf.data = {name: "", gender: "", taunt_text: ""}

    const dialogRefernece = this.dialog.open(TrainerAddComponent, dialogConf);
    dialogRefernece.afterClosed().subscribe(result =>{
      if(!(result == undefined)) {
        this.TrainerNewCreation(result);
      }
    });
  }

  editDialog(trainer: ITrainer): void {
    const dialogueConfig = new MatDialogConfig();
    dialogueConfig.data ={id: trainer.id, name: trainer.name, gender: trainer.gender, taunt_text: trainer.taunt_text};
    const dialogRef = this.dialog.open(TrainerEditComponent, dialogueConfig);

    dialogRef.afterClosed().subscribe(result =>{
      this.trainerEdition(result)
    })
  }

  TrainerNewCreation(newTrainer: ITrainer) {
    this.trainerService.CreateTrainer(newTrainer).subscribe({
      next: (result:any) => {
        this.trainers.push(result)
      },
      error: (error:any) => {
        console.error(error);
      },
    });
  }
  trainerEdition(editedTrainer: ITrainer) {
    this.trainerService.UpdateTrainer(editedTrainer).subscribe({
      next: (result:any) => {
        const trainerIndex = this.trainers.findIndex(i => i.id == result.id);
        this.trainers[trainerIndex] = result;
      },
      error: (error: any) => {
        console.error(error)
      },
    });
  }

  trainerRemove(trainerRemoveId: number) {
    this.trainerService.DeleteTrainer(trainerRemoveId).subscribe({
      next: (result: any) => {
        var trainerIndex = this.trainers.findIndex(i => i.id==trainerRemoveId);
        this.trainers.splice(trainerIndex, 1)

      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  exit() {
    this.dialogPost.close();
  }
  closeClash(trainer: ITrainer){
    this.dialogPost.close(trainer);
  }
}
