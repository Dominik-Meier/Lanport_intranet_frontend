import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Tournament} from '../../models/Tournament';
import {mapJSONToTournamentArray} from '../../util/mapperFunctions';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  constructor(private http: HttpClient) {
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
  }

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
}
