import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'battlemon-resurrected';
  constructor(
    public dialog: MatDialog,
    ){}

  openBattlemonTableDialog(){
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(PokemonTableComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  };
}
