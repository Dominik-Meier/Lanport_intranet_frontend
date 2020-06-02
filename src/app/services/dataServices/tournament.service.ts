import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Tournament} from "../../models/Tournament";
import {GameMode} from "../../models/GameMode";
import {TournamentType} from "../../models/TournamentType";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  constructor(private http: HttpClient) {
    this.init();
  }

  init(): void {
    this.getTournamentsBackend().subscribe(res => {
      this.tournaments = res;
      this.tournamentsSubject.next(this.tournaments);
    })
  }

  private url = environment.BASE_API_URL;
  private tournaments: Tournament[];


  private tournamentsSubject = new Subject<Tournament[]>();
  public getTournamentObservable = this.tournamentsSubject.asObservable();

  /**
   * Local methodes to the frontend from here on!
   */
  getTournaments() {
    return this.tournaments;
  }

  getTournament(id: number) {
    if (this.tournaments){
      return this.tournaments.find( x => x.getId() === id);
    }
  }

  saveTournament(tournaments: Tournament[]) {
    this.saveTournamentsBackend(tournaments).subscribe(() => {
      this.getTournamentsBackend().subscribe(newSavedTournaments => {
        this.tournaments = newSavedTournaments;
        this.tournamentsSubject.next(newSavedTournaments);
      });
    })
  }


  /**
   * Remote methodes to the backend from here on!
   */
  getTournamentsBackend(): Observable<Tournament[]> {
    const targetURL = this.url + 'tournaments';
    return this.http.get<Tournament[]>(targetURL).pipe(map(
      response => {
        return this.mapJSONToTournamentArray(response);
      }
    ));
  }

  saveTournamentsBackend(tournaments: Tournament[]): Observable<Tournament[]> {
    const targetURL = this.url + 'tournaments';
    return this.http.put<Tournament[]>(targetURL, tournaments);
  }

  //TODO map lanparty to or get it from the service
  mapJSONToTournamentArray(data: any): Tournament[] {
    const result: Tournament[] = [];
    data.forEach(t => result.push(new Tournament(t.id, t.name, t.lanparty,
      new GameMode(t.gamemode.id, t.gamemode.name, t.gamemode.game, t.gamemode.elimination, t.gamemode.teamSize, t.gamemode.rules),
      new TournamentType(t.tournamentType.id, t.tournamentType.name),
      t.teamRegistration, t.numberOfParticipants, t.published, t.started, t.startDate, t.finished)));
    return result;
  }
}
