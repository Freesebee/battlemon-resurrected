import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IBattlemon from '../interfaces/IBattlemon';
import ITrainerBattlemon from '../interfaces/ITrainerBattlemon';

@Injectable({
  providedIn: 'root',
})
export class BattlemonService {
  private _baseApiUrl = 'http://localhost:3000/battlemons';
  private _trainersBattlemonsApiUrl =
    'http://localhost:3000/trainers-battlemons';

  constructor(private _http: HttpClient) {}

  public GetAllBattlemons(): Observable<IBattlemon[]> {
    return this._http.get<IBattlemon[]>(this._baseApiUrl);
  }

  public GetBattlemonById(id: number): Observable<IBattlemon> {
    return this._http.get<IBattlemon>(this._baseApiUrl + '/' + id);
  }

  public CreateBattlemon(battlemon: IBattlemon): Observable<IBattlemon> {
    battlemon.id = 0; //required for json-server to generate id
    return this._http.post<IBattlemon>(this._baseApiUrl, battlemon);
  }

  public UpdateBattlemon(battlemon: IBattlemon): Observable<IBattlemon> {
    return this._http.put<IBattlemon>(
      this._baseApiUrl + '/' + battlemon.id,
      battlemon
    );
  }

  public DeleteBattlemon(id: number): Observable<IBattlemon> {
    const data = this._http.delete<IBattlemon>(this._baseApiUrl + '/' + id);
    this._http
      .get<ITrainerBattlemon[]>(
        this._trainersBattlemonsApiUrl + `/?battlemon_id=${id}`
      )
      .subscribe({
        next: (array: ITrainerBattlemon[]) => {
          array.forEach((trainerBattlemon) => {
            this._http.delete<ITrainerBattlemon>(
              this._baseApiUrl +
                this._trainersBattlemonsApiUrl +
                '/' +
                trainerBattlemon.id
            );
          });
        },
        error: (error) => {
          console.log(error);
        },
      });

    return data;
  }
}
