import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import IBattlemon from '../interfaces/IBattlemon';
import ITrainer from '../interfaces/ITrainer';
import { PokemonTableComponent } from '../pokemon-table/pokemon-table.component';
@Component({
  selector: 'app-clash',
  templateUrl: './clash.component.html',
  styleUrls: ['./clash.component.scss']
})
export class ClashComponent implements OnInit {

  constructor(
    public dialogRefTable: MatDialogRef<ClashComponent>,
    public dialog: MatDialog) { }
    // trainer1?: ITrainer;
    // trainer2?: ITrainer;

    battlemon1?: IBattlemon;
    battlemon2?: IBattlemon;
  ngOnInit(): void {
  }
  openTrainerTableDialog1(){
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(PokemonTableComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.pickTrainer1(result);

    });
  };
  openTrainerTableDialog2(){
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(PokemonTableComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.pickTrainer2(result);

    });
  };
  close() {
    this.dialogRefTable.close();
  }
  pickTrainer1(battlemon: IBattlemon ){ //trainer:ITrainer
    this.battlemon1 = battlemon;
    //this.trainer1 = trainer;
  }
  pickTrainer2(battlemon: IBattlemon){
    this.battlemon2 = battlemon;
    //this.trainer2 = trainer;

  }
}
