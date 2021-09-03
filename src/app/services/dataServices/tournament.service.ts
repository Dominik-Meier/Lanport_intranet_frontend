import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tournament} from '../../models/Tournament';
import {mapJSONToTournamentArray} from '../../util/mapperFunctions';
import {EventEmitterService} from '../event-emitter.service';
import {tournamentsDiffer} from '../../util/modelDiffers/tournamentUpdaterFunctions';

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
    this.eventEmitter.tournamentsUpdatedObservable.subscribe( event => {
      this.updateTournamentAction(event);
    });
    this.eventEmitter.tournamentDeletedObservable.subscribe( t => this.removeTournamentFromList(t));
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
    if (index) {
      this.tournaments.splice(index, 1);
    }
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
}
