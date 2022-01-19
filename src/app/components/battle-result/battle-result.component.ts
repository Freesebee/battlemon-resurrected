import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-battle-result',
  templateUrl: './battle-result.component.html',
  styleUrls: ['./battle-result.component.scss']
})
export class BattleResultComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogPost: MatDialogRef<BattleResultComponent>

  ) { }

  ngOnInit(): void {
  }

  exit() {
    this.dialogPost.close();
  }

}
