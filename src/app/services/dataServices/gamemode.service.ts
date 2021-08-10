import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {GameMode} from '../../models/GameMode';
import {mapJSONToGameModeArray} from '../../util/mapperFunctions';

@Injectable({
  providedIn: 'root'
})

export class GamemodeService {
  constructor(private http: HttpClient) {
    this.init();
  }

  url = environment.BASE_API_URL;
  gameModes: GameMode[];

  gameModesSubject = new Subject<GameMode[]>();
  getGameModeObservable = this.gameModesSubject.asObservable();

  init(): void {
    this.getGameModesBackend().subscribe( res => {
      this.gameModes = res;
      this.gameModesSubject.next(this.gameModes);
    });
  }

  /**
   * Local methodes to the frontend from here on!
   */

  getGameModes() {
    return this.gameModes;
  }

  saveGameModes(gameModes: GameMode[]) {
    this.saveGameModesBackend(gameModes).subscribe( () => {
      this.getGameModesBackend().subscribe( res => {
        this.gameModes = res;
        this.gameModesSubject.next(this.gameModes);
      });
    });
  }


  /**
   * Remote methodes to the backend from here on!
   */

  getGameModesBackend(): Observable<GameMode[]> {
    const targetURL = this.url + 'gamemodes';
    return this.http.get<GameMode[]>(targetURL).pipe( map(
      response => mapJSONToGameModeArray(response)
    ));
  }

  saveGameModesBackend(gamemodes: GameMode[]): Observable<GameMode[]> {
    const targetURL = this.url + 'gamemodes';
    return this.http.put<GameMode[]>(targetURL, gamemodes);
  }
}
