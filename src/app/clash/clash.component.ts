import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import IBattlemon from '../interfaces/IBattlemon';
import ITrainer from '../interfaces/ITrainer';
import { TrainerListComponent } from '../trainer-list/trainer-list.component';
@Component({
  selector: 'app-clash',
  templateUrl: './clash.component.html',
  styleUrls: ['./clash.component.scss']
})
export class ClashComponent implements OnInit {

  constructor(
    public dialogRefTable: MatDialogRef<ClashComponent>,
    public dialog: MatDialog) { }
    trainer1?: ITrainer;
    trainer2?: ITrainer;

  ngOnInit(): void {
  }
  openTrainerTableDialog1(){
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(TrainerListComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.pickTrainer1(result);

    });
  };
  openTrainerTableDialog2(){
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(TrainerListComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.pickTrainer2(result);

    });
  };
  close() {
    this.dialogRefTable.close();
  }
  pickTrainer1(trainer:ITrainer ){
    this.trainer1 = trainer;
  }
  pickTrainer2(trainer:ITrainer){
    this.trainer2 = trainer;

  }
}
