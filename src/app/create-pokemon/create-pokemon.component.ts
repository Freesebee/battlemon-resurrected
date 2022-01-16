import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import IBattlemon from '../interfaces/IBattlemon';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.scss'],
})
export class CreatePokemonComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}


  @Input() battlemon!: IBattlemon;
  @Output() newBattlemon = new EventEmitter<IBattlemon>();

  createForm = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(10)],
    ],
    type: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(10)],
    ],
    dmg: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(10)],
    ],
    hp: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(10)],
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

  onSubmit(value: IBattlemon): void {
    if (this.battlemon == undefined) {
      this.battlemon = {
        id:0,
        name: this.createForm.get('name')?.value,
        dmg: this.createForm.get('dmg')?.value,
        crit_chance:this.createForm.get('name')?.value,
        hp: this.createForm.get('hp')?.value,
        type: this.createForm.get('type')?.value
      };
    } else {
      this.battlemon.name = this.createForm.get('name')?.value;
      this.battlemon.dmg = this.createForm.get('dmg')?.value;
      this.battlemon.crit_chance = this.createForm.get('crit_chance')?.value;
      this.battlemon.hp = this.createForm.get('hp')?.value;
      this.battlemon.type = this.createForm.get('type')?.value;
    }
    this.newBattlemon.emit(this.battlemon);
    this.createForm.reset();
  }

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
}
