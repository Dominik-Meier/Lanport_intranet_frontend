import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {GameMode} from "../../models/GameMode";

@Injectable({
  providedIn: 'root'
})

export class GamemodeService {
  constructor(private http: HttpClient) {
    this.init();
  }

  init(): void {
    this.getGameModesBackend().subscribe( res => {
      this.gameModes = res;
      this.gameModesSubject.next(this.gameModes);
    })
  }

  private url = environment.BASE_API_URL;
  private gameModes: GameMode[];

  private gameModesSubject = new Subject<GameMode[]>();
  public getGameModeObservable = this.gameModesSubject.asObservable();

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
      })
    })
  }


  /**
   * Remote methodes to the backend from here on!
   */

  getGameModesBackend(): Observable<GameMode[]> {
    const targetURL = this.url + 'gamemodes';
    return this.http.get<GameMode[]>(targetURL).pipe( map(
      response => { return this.mapJSONToGameModeArray(response); }
    ));
  }

  saveGameModesBackend(gamemodes: GameMode[]): Observable<GameMode[]> {
    const targetURL = this.url + 'gamemodes';
    return this.http.put<GameMode[]>(targetURL, gamemodes);
  }

  mapJSONToGameModeArray(data: any): GameMode[] {
    const result: GameMode[] = [];
    data.forEach( gamemode => result.push(new GameMode(gamemode.id, gamemode.name, gamemode.game, gamemode.elimination, gamemode.teamSize, gamemode.rules)));
    return result;
  }
}
