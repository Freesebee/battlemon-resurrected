import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-coach-form',
  templateUrl: './coach-form.component.html',
  styleUrls: ['./coach-form.component.scss'],
})
export class CoachFormComponent {
  name = new FormControl('', [
    Validators.required,
    Validators.maxLength(15),
    Validators.minLength(4),
  ]);
  gender = new FormControl('');
  taunt_text = new FormControl('', [
    Validators.minLength(2),
    Validators.maxLength(20),
  ]);
}
