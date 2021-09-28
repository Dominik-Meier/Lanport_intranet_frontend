import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {GameMode} from '../../models/GameMode';
import {mapJSONToGameModeArray} from '../../util/mapperFunctions';
import {EventEmitterService} from '../event-emitter.service';
import {gameModesDiffer} from '../../util/modelDiffers/gameModeUpdater';

@Injectable({
  providedIn: 'root'
})

// TODO implement new add method which create the object first and than adds it to the list that the id is always present
export class GamemodeService {
  constructor(private http: HttpClient,
              private eventEmitter: EventEmitterService) {
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
    this.eventEmitter.gameModesUpdatedObservable.subscribe(gm => this.updateGameModes(gm));
    this.eventEmitter.gameModeDeletedObservable.subscribe( gm => this.removeGameModeFromList(gm));
  }

  updateGameModes(newGameModes: GameMode[]) {
    gameModesDiffer(this.gameModes, newGameModes);
  }

  removeGameModeFromList(gameMode: GameMode) {
    const index = this.gameModes.findIndex( x => x.id.toString() === gameMode.id.toString());
    if (index > -1) {
      this.gameModes.splice(index, 1);
    }
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

  createGameMode() {
    const targetURL = this.url + 'gamemodes';
    return this.http.post<GameMode[]>(targetURL, null);
  }

  saveGameModesBackend(gamemodes: GameMode[]): Observable<GameMode[]> {
    const targetURL = this.url + 'gamemodes';
    return this.http.put<GameMode[]>(targetURL, gamemodes);
  }

  deleteGameMode(id: number) {
    const targetURL = this.url + 'gamemodes/' + id.toString();
    return this.http.delete(targetURL);
  }
}
