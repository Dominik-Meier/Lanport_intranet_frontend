import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tournament} from '../../models/Tournament';
import {mapJSONToTournamentArray} from '../../util/mapperFunctions';
import {EventEmitterService} from '../event-emitter.service';
import {tournamentsDiffer} from '../../util/modelDiffers/tournamentUpdaterFunctions';
import {GameMode} from '../../models/GameMode';
import {gameModeDiffer} from '../../util/modelDiffers/gameModeUpdater';
import {TournamentType} from '../../models/TournamentType';
import {tournamentTypeDiffer} from '../../util/modelDiffers/tournamentTypeUpdater';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  constructor(private http: HttpClient, private eventEmitter: EventEmitterService) {
    this.init();
  }

  private url = environment.BASE_API_URL;
  private tournaments: Tournament[];


  private tournamentsSubject = new Subject<Tournament[]>();
  public getTournamentObservable = this.tournamentsSubject.asObservable();

  init(): void {
    this.getTournamentsBackend().subscribe(res => {
      this.tournaments = res;
      this.tournamentsSubject.next(this.tournaments);
    });
    this.eventEmitter.tournamentDeletedObservable.subscribe( t => this.removeTournamentFromList(t));
    this.eventEmitter.tournamentsUpdatedObservable.subscribe(t => this.updateTournamentAction(t));
    this.eventEmitter.gameModesUpdatedObservable.subscribe(gm => this.updateTournamentGameModeAction(gm));
    this.eventEmitter.tournamentTypesUpdatedObservable.subscribe(tt => this.updateTournamentTypeAction(tt));
  }

  updateTournamentAction(tournaments: Tournament[]) {
    tournamentsDiffer(this.tournaments, tournaments);
    this.tournamentsSubject.next(this.tournaments);
  }

  /**
   * Local methodes to the frontend from here on!
   */
  getTournaments() {
    return this.tournaments;
  }

  getTournament(id: number) {
    if (this.tournaments){
      return this.tournaments.find( x => x.getId().toString() === id.toString());
    }
  }

  saveTournament(tournaments: Tournament[]) {
    this.saveTournamentsBackend(tournaments).subscribe();
  }

  removeTournamentFromList(tournament: Tournament) {
    const index = this.tournaments.findIndex( x => x.id.toString() === tournament.id.toString());
    if (index > -1) {
      this.tournaments.splice(index, 1);
    }
  }

  updateTournamentGameModeAction(gameModes: GameMode[]) {
    this.tournaments.forEach( x => {
      const newGameMode = gameModes.find( y => y.id.toString() === x.id.toString());
      if (newGameMode !== null) {
        gameModeDiffer(x.gameMode, newGameMode);
      }
    });
  }

  updateTournamentTypeAction(tournamentTypes: TournamentType[]) {
    this.tournaments.forEach( x => {
      const newTournamentType = tournamentTypes.find( y => y.id.toString() === x.id.toString());
      if (newTournamentType !== null) {
        tournamentTypeDiffer(x.tournamentType, newTournamentType);
      }
    });
  }

  /**
   * Remote methodes to the backend from here on!
   */
  getTournamentsBackend(): Observable<Tournament[]> {
    const targetURL = this.url + 'tournaments';
    return this.http.get<Tournament[]>(targetURL).pipe(map(
      response => {
        return mapJSONToTournamentArray(response);
      }
    ));
  }

  saveTournamentsBackend(tournaments: Tournament[]): Observable<Tournament[]> {
    const targetURL = this.url + 'tournaments';
    return this.http.put<Tournament[]>(targetURL, tournaments);
  }

  addTournament() {
    const targetURL = this.url + 'tournaments';
    return this.http.post<Tournament[]>(targetURL, null);
  }

  deleteTournament(id: number) {
    const targetURL = this.url + 'tournaments/' + id.toString();
    return this.http.delete(targetURL);
  }

  createChallongeTournament(id) {
    const targetURL = this.url + 'tournaments/challonge/' + id.toString();
    return this.http.post<any>(targetURL, null);
  }

  updateChallongeTournament(id) {
    const targetURL = this.url + 'tournaments/challonge/' + id.toString();
    return this.http.put<any>(targetURL, null);
  }

  createChallongeParticipants(id) {
    const targetURL = this.url + 'tournaments/challonge/' + id.toString() + '/participants/';
    return this.http.post<any>(targetURL, null);
  }

  clearChallongeParticipants(id) {
    const targetURL = this.url + 'tournaments/challonge/' + id.toString() + '/participants/';
    return this.http.delete<any>(targetURL);
  }

  startChallongeParticipants(id) {
    const targetURL = this.url + 'tournaments/challonge/' + id.toString() + '/start';
    return this.http.post<any>(targetURL, null);
  }
}
