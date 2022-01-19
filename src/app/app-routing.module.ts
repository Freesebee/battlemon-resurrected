import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './components/battle/battle.component';
import { ListOfBattlemonsComponent } from './components/list-of-battlemons/list-of-battlemons.component';

const routes: Routes = [
  { path: 'battlemons', component: ListOfBattlemonsComponent },
  { path: 'battle/:tr1id/:tr2id', component: BattleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
