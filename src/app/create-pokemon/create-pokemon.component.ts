import { Component, OnInit, Input, Output, EventEmitter, Inject  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import IBattlemon from '../interfaces/IBattlemon';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BattlemonType} from "../enums/BattlemonType";

interface TypeOf {
  type: string;
}

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.scss'],
})

export class CreatePokemonComponent implements OnInit {
  foods: TypeOf[] = [
    {type: 'Fire'},
    {type: 'Water'},
    {type: 'Air'},
    {type: 'Ground'}
  ];
  //type1 = null;
  //typeOf = BattlemonType
  //enumKeys=[];
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreatePokemonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    //this.enumKeys = Object.keys(this.typeOf).filter(k=> !isNaN(Number(k)))
  }
  //change1(value: string) {
   // this.type1 = this.typeOf[value];
 // }

  @Input() battlemon!: IBattlemon;
  @Output() newBattlemon = new EventEmitter<IBattlemon>();

  createForm = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(10)],
    ],
    type: [
      '',
      [Validators.required],
    ],
    dmg: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    hp: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    crit_chance: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.min(0),
        Validators.max(100),
      ],
    ],
  });


  ngOnInit(): void {}
  get id() {
    return this.createForm.get('id');
  }
  get name() {
    return this.createForm.get('name');
  }
  get type() {
    return this.createForm.get('type');
  }
  get dmg() {
    return this.createForm.get('dmg');
  }
  get hp() {
    return this.createForm.get('hp');
  }
  get crit_chance() {
    return this.createForm.get('crit_chance');
  }
  close() {
    this.dialogRef.close();
  }
  save(){
    this.dialogRef.close(this.createForm.value);
  }
}
