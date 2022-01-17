import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import ITrainer from "../interfaces/ITrainer";
import {Validator} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-trainer-add',
  templateUrl: './trainer-add.component.html',
  styleUrls: ['./trainer-add.component.scss']
})
export class TrainerAddComponent implements OnInit {
  @Input() trainer!: ITrainer;
  @Output() trainerAdded = new EventEmitter<ITrainer>();

  constructor(
    public dialog: MatDialogRef<TrainerAddComponent>,
    private formTrainer: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public info: any
  ) {
  }

  newForm = this.formTrainer.group({
    name: [''],
    gender: [''],
    taunt_text: [''],
  });

  ngOnInit(): void
  { }

  get id()
  {
    return this.newForm.get('id');
  }

  get name()
  {
    return this.newForm.get('name');
  }

  get gender()
  {
    return this.newForm.get('gender');
  }

  /*get matches_won() {
    return this.newForm.get('matches_won');
  }
  get matches_lost() {
    return this.newForm.get('matches_lost');
  }*/
  get taunt_text()
  {
    return this.newForm.get('taunt_text');
  }

  exit()
  {
    this.dialog.close()
  }

  save()
  {
    this.dialog.close(this.newForm.value)
  }


}
