import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import ITrainer from "../interfaces/ITrainer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-trainer-edit',
  templateUrl: './trainer-edit.component.html',
  styleUrls: ['./trainer-edit.component.scss']
})
export class TrainerEditComponent implements OnInit {

  @Input() trainer!: ITrainer;
  @Output() trainerAdded = new EventEmitter<ITrainer>();

  constructor(
    public dialog: MatDialogRef<TrainerEditComponent>,
    private formTrainer: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public info: any
  ) {
  }

  editedForm = this.formTrainer.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    gender: [''],
    taunt_text: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
  });

  ngOnInit(): void
  { }

  get id()
  {
    return this.editedForm.get('id');
  }

  get name()
  {
    return this.editedForm.get('name');
  }

  get gender()
  {
    return this.editedForm.get('gender');
  }

  get matches_won() {
    return this.editedForm.get('matches_won');
  }
  get matches_lost() {
    return this.editedForm.get('matches_lost');
  }
  get taunt_text()
  {
    return this.editedForm.get('taunt_text');
  }

  exit()
  {
    this.dialog.close()
  }

  save()
  {
    this.dialog.close(this.editedForm.value)
  }


}
