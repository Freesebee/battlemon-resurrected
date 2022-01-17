import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreatePokemonComponent } from '../create-pokemon/create-pokemon.component';
import IBattlemon from '../interfaces/IBattlemon';
import { BattlemonService } from 'src/app/services/battlemon.service';
import { EditPokemonComponent } from '../edit-pokemon/edit-pokemon.component';
@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss'],
})
export class PokemonTableComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _battlemonService: BattlemonService
  ) {}

  @Input() battlemons!: IBattlemon[];

  openCreateDialog(battlemon?: IBattlemon): void {
    // const dialogRef = this.dialog.open(CreatePokemonComponent, {
    //   width: '640px',
    //   disableClose: true,
    // });
    const dialogConfig = new MatDialogConfig();

    // if(battlemon == undefined){
    dialogConfig.data = {name: "", type:"", dmg:"", hp:"", crit_chance:""};
    // }
    // else{
    //dialogConfig.data = {name: battlemon.name, type:battlemon.type, dmg:battlemon.dmg, hp:battlemon.hp, crit_chance:battlemon.crit_chance};
    // }
    const dialogRef = this.dialog.open(CreatePokemonComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.createNewBattlemon(result);
      //this.editBattlemon(result);

    });
  }

  openEditDialog(battlemon: IBattlemon): void {
    // const dialogRef = this.dialog.open(CreatePokemonComponent, {
    //   width: '640px',
    //   disableClose: true,
    // });
    const dialogConfigEdit = new MatDialogConfig();

    dialogConfigEdit.data = {id: battlemon.id, name: battlemon.name, type:battlemon.type, dmg:battlemon.dmg, hp:battlemon.hp, crit_chance:battlemon.crit_chance};
    const dialogRefEdit = this.dialog.open(EditPokemonComponent, dialogConfigEdit);

    dialogRefEdit.afterClosed().subscribe(result => {
      console.log(result);
      //this.createNewBattlemon(result);
      this.editBattlemon(result);

    });
  }

  ngOnInit(): void {
    this.onGetAll();
  }
  onGetAll() {
    this._battlemonService.GetAllBattlemons().subscribe({
      next: (result: any) => {
        console.log(result);
        this.battlemons = result;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  createNewBattlemon(createdBattlemon: IBattlemon) {
    this._battlemonService.CreateBattlemon(createdBattlemon).subscribe({
      next: (result: any) => {
        console.log(result);
        this.battlemons.push(result);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  editBattlemon(battlemonToEdit: IBattlemon) {
    this._battlemonService.UpdateBattlemon(battlemonToEdit).subscribe({
      next: (result: any) => {
        console.log(result);
        var index =  this.battlemons.findIndex(x => x.id==result.id);
        this.battlemons[index] = result;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  deleteBattlemon(battlemonToDeleteId: number) {
    this._battlemonService.DeleteBattlemon(battlemonToDeleteId).subscribe({
      next: (result: any) => {
        console.log(result);
        var index =  this.battlemons.findIndex(x => x.id==battlemonToDeleteId);
        this.battlemons.splice(index,1);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
