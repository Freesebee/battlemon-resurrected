import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ITrainer from '../interfaces/ITrainer';
import IBattlemon from '../interfaces/IBattlemon';
import ITrainerBattlemon from '../interfaces/ITrainerBattlemon';

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _baseApiUrl = 'http://localhost:3000';
  private _trainersApiUrl = '/trainers';
  private _trainersBattlemonsApiUrl = '/trainers-battlemons';

  constructor(private _http: HttpClient) {}

  public GetAllTrainers(): Observable<ITrainer[]> {
    return this._http.get<ITrainer[]>(this._baseApiUrl + this._trainersApiUrl);
  }

  public GetTrainerById(id: number): Observable<ITrainer[]> {
    return this._http.get<ITrainer[]>(
      this._baseApiUrl + this._trainersApiUrl + '/' + id
    );
  }

  public GetTrainerBattlemons(trainerId: number): Observable<IBattlemon[]> {
    return this._http.get<IBattlemon[]>(
      this._baseApiUrl + this._trainersBattlemonsApiUrl + '/' + trainerId
    );
  }

  public AddTrainerBattlemon(trainerBattlemon: ITrainerBattlemon) {
    return this._http.post(
      this._baseApiUrl + this._trainersBattlemonsApiUrl,
      trainerBattlemon
    );
  }

  public RemoveTrainerBattlemon(id: number) {
    return this._http.delete(
      this._baseApiUrl + this._trainersBattlemonsApiUrl + '/' + id
    );
  }

  public CreateTrainer(trainer: ITrainer): Observable<ITrainer> {
    return this._http.post<ITrainer>(
      this._baseApiUrl + this._trainersApiUrl,
      trainer
    );
  }

  public UpdateTrainer(trainer: ITrainer): Observable<ITrainer> {
    return this._http.put<ITrainer>(
      this._baseApiUrl + this._trainersApiUrl + '/' + trainer.id,
      trainer
    );
  }

  public DeleteTrainer(id: number): Observable<ITrainer> {
    return this._http.delete<ITrainer>(
      this._baseApiUrl + this._trainersApiUrl + '/' + id
    );
  }
}
