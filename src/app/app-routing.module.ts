import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfBattlemonsComponent } from './components/list-of-battlemons/list-of-battlemons.component';

const routes: Routes = [
  { path: 'battlemons', component: ListOfBattlemonsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
