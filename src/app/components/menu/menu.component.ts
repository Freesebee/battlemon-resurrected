import { Component, OnInit } from '@angular/core';
import { BattlemonType } from 'src/app/enums/BattlemonType';
import IBattlemon from 'src/app/interfaces/IBattlemon';
import { BattlemonService } from 'src/app/services/battlemon.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private _battlemonService: BattlemonService) { }

  ngOnInit(): void {
  }

  onClick() {
    const x: IBattlemon = {
      dmg: 9,
      hp: 1,
      crit_chance: 0.5,
      id: 0,
      name: 'Hardcode',
      type: BattlemonType.Air
    }

    this._battlemonService.CreateBattlemon(x).subscribe(
      resp => {
        console.log(resp)
      },
      error => {
        console.error(error)
      }
    )
  }
}
