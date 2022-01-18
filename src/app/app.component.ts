import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClashComponent } from './clash/clash.component';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';
import {TrainerListComponent} from "./trainer-list/trainer-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'battlemon-resurrected';
  constructor(
    public dialog: MatDialog,
    public dialogTrain:MatDialog,
    ){}

  openBattlemonTableDialog(){
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(PokemonTableComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  };
  openClashDialog(){
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(ClashComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  };


  openTrainerDialog()
  {
    const dialogConf = new MatDialogConfig();
    const dialogue = this.dialogTrain.open(TrainerListComponent, dialogConf);
    dialogue.afterClosed().subscribe(result => {
      console.log(result)
    });
  };
}
