import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListOfBattlemonsComponent } from './components/list-of-battlemons/list-of-battlemons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { ClashComponent } from './clash/clash.component';
import { TrainerAddComponent } from './trainer-add/trainer-add.component';
import { TrainerEditComponent } from './trainer-edit/trainer-edit.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { ListOfTrainersComponent } from './components/list-of-trainers/list-of-trainers.component';
import { BattleComponent } from './components/battle/battle.component';
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
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatGridListModule,
    MatCardModule,
  ],
  declarations: [
    AppComponent,
    ListOfBattlemonsComponent,
    PokemonTableComponent,
    CreatePokemonComponent,
    EditPokemonComponent,
    ClashComponent,
    TrainerAddComponent,
    TrainerEditComponent,
    TrainerListComponent,
    ListOfTrainersComponent,
    BattleComponent,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
