import { Component, OnInit, Input, Output, EventEmitter, Inject  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import IBattlemon from '../interfaces/IBattlemon';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss']
})
export class EditPokemonComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialogRefEdit: MatDialogRef<EditPokemonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  @Input() battlemon!: IBattlemon;
  @Output() newBattlemon = new EventEmitter<IBattlemon>();

  editForm = this.formBuilder.group({
    id: [
      '',
      [Validators.required],
    ],
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
    return this.editForm.get('id');
  }
  get name() {
    return this.editForm.get('name');
  }
  get type() {
    return this.editForm.get('type');
  }
  get dmg() {
    return this.editForm.get('dmg');
  }
  get hp() {
    return this.editForm.get('hp');
  }
  get crit_chance() {
    return this.editForm.get('crit_chance');
  }
  close() {
    this.dialogRefEdit.close();
  }
  save(){
    this.dialogRefEdit.close(this.editForm.value);
  }
}

