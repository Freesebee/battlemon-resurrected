import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreatePokemonComponent } from '../create-pokemon/create-pokemon.component';
import IBattlemon from '../interfaces/IBattlemon';
import { BattlemonService } from 'src/app/services/battlemon.service';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {

  constructor(public dialog: MatDialog,private _battlemonService: BattlemonService) { }

  @Input() battlemons!: IBattlemon[];


  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreatePokemonComponent,{
      width: '640px',disableClose: true
    });
  }
  ngOnInit(): void {
    this.onGetAll()

  }
  onGetAll() {
    this._battlemonService.GetAllBattlemons().subscribe({
      next: (result: any) => {
        console.log(result);
        this.battlemons = result
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

}
