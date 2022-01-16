import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreatePokemonComponent } from '../create-pokemon/create-pokemon.component';
@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreatePokemonComponent,{
      width: '640px',disableClose: true
    });
  }
  ngOnInit(): void {
  }

}
