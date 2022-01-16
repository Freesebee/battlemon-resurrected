import { Component, OnInit } from '@angular/core';
import IBattlemon from 'src/app/interfaces/IBattlemon';
import { BattlemonService } from 'src/app/services/battlemon.service';

@Component({
  selector: 'app-list-of-battlemons',
  templateUrl: './list-of-battlemons.component.html',
  styleUrls: ['./list-of-battlemons.component.scss']
})
export class ListOfBattlemonsComponent implements OnInit {

  battlemons: IBattlemon[] = []
  displayedColumns: string[] = ['Name', 'DMG', 'HP', 'Type'];
  
  constructor(private _battlemonService: BattlemonService) { }

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

  onAdd(battlemon: IBattlemon) {
    this._battlemonService.CreateBattlemon(battlemon).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  onDelete(battlemonId: number) {
    this._battlemonService.DeleteBattlemon(battlemonId).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  onUpdate(battlemon: IBattlemon) {
    this._battlemonService.UpdateBattlemon(battlemon).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

}
