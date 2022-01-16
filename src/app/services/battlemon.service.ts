import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IBattlemon from '../interfaces/IBattlemon';

@Injectable({
  providedIn: 'root',
})
export class BattlemonService {
  private _baseApiUrl = 'http://localhost:3000/battlemons';

  constructor(private _http: HttpClient) {}

  public GetAllBattlemons(): Observable<IBattlemon[]> {
    return this._http.get<IBattlemon[]>(this._baseApiUrl);
  }

  public GetBattlemonById(id: number): Observable<IBattlemon[]> {
    return this._http.get<IBattlemon[]>(this._baseApiUrl + '/' + id);
  }

  public CreateBattlemon(battlemon: IBattlemon): Observable<IBattlemon> {
    return this._http.post<IBattlemon>(this._baseApiUrl, battlemon);
  }

  public UpdateBattlemon(battlemon: IBattlemon): Observable<IBattlemon> {
    return this._http.put<IBattlemon>(this._baseApiUrl + '/' + battlemon.id, battlemon);
  }

  public DeleteBattlemon(id: number): Observable<IBattlemon> {
    return this._http.delete<IBattlemon>(this._baseApiUrl + '/' + id);
  }
}
