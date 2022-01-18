import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreatePokemonComponent } from '../create-pokemon/create-pokemon.component';
import IBattlemon from '../interfaces/IBattlemon';
import { BattlemonService } from 'src/app/services/battlemon.service';
import { EditPokemonComponent } from '../edit-pokemon/edit-pokemon.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss'],
})
export class PokemonTableComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private _battlemonService: BattlemonService,
    public dialogRefTable: MatDialogRef<PokemonTableComponent>,

  ) {}

  @Input() battlemons!: IBattlemon[];

  columns: any[] = ['id','name','type', 'dmg', 'hp', 'crit_chance', 'operations' ];
  dataSource!: MatTableDataSource<IBattlemon>;

  @ViewChild(MatSort, {static:true}) sort!: MatSort;

  openCreateDialog(battlemon?: IBattlemon): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {name: "", type:"", dmg:"", hp:"", crit_chance:""};

    const dialogRef = this.dialog.open(CreatePokemonComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(!(result == undefined)){
        this.createNewBattlemon(result);
      }

    });
  }

  openEditDialog(battlemon: IBattlemon): void {

    const dialogConfigTable = new MatDialogConfig();

    dialogConfigTable.data = {id: battlemon.id, name: battlemon.name, type:battlemon.type, dmg:battlemon.dmg, hp:battlemon.hp, crit_chance:battlemon.crit_chance};
    const dialogRefTable = this.dialog.open(EditPokemonComponent, dialogConfigTable);

    dialogRefTable.afterClosed().subscribe(result => {
      console.log(result);
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
        this.dataSource = new MatTableDataSource(this.battlemons)
        this.dataSource.sort = this.sort;

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
        this.onGetAll();

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
        this.onGetAll();

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
        this.onGetAll();

      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  close() {
    this.dialogRefTable.close();
  }

  pokemonChoosing(battlemon: IBattlemon) {
    this.dialogRefTable.close(battlemon)
  }
}
