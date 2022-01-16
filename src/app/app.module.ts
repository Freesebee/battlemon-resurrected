import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListOfBattlemonsComponent } from './components/list-of-battlemons/list-of-battlemons.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: '', component: MenuComponent }]),
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  declarations: [AppComponent, ListOfBattlemonsComponent],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
