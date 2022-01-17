import { Injectable } from '@angular/core';
import ITrainer from '../interfaces/ITrainer';
import { TrainerService } from './trainer.service';

@Injectable({
  providedIn: 'root'
})
export class WinHandlerService {

  constructor(private _trainerService: TrainerService) { }
  trainer1!: ITrainer;
  trainer2!: ITrainer;
  firstTrainerWon!: boolean;

  getTrainers(id1: number, id2: number){
    this._trainerService.GetTrainerById(id1).subscribe({
      next: (result: any) => {
        console.log(result);
        this.trainer1 = result;
      },
      error: (error: any) => {
        console.error(error);
      },
    });

    this._trainerService.GetTrainerById(id2).subscribe({
      next: (result: any) => {
        console.log(result);
        this.trainer2 = result;

      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  applyMatchInfoToTrainers(){
    if(this.firstTrainerWon){
      this.trainer1.matches_won++;
      this.trainer2.matches_lost++;

    }
    else{
      this.trainer2.matches_won++;
      this.trainer1.matches_lost++;
    }
  }
  updateTrainerMatches(){
    this._trainerService.UpdateTrainer(this.trainer1).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (error: any) => {
        console.error(error);
      },
    });

    this._trainerService.UpdateTrainer(this.trainer2).subscribe({
      next: (result: any) => {
        console.log(result);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  handleEverything(id1: number, id2: number){
    this.getTrainers(id1,id2);
    this.applyMatchInfoToTrainers()
    this.updateTrainerMatches()
  }
}
