import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';

const routes: Routes = [
  // { path: 'first-component', component: FirstComponent },
  // { path: 'second-component', component: SecondComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
