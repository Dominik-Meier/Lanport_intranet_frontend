import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Team} from '../../models/Team';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {TournamentParticipant} from '../../models/TournamentParticipant';
import {mapJSONToTournamentParticipant, mapJSONToTournamentParticipantArray} from '../../util/mapperFunctions';

@Injectable({
  providedIn: 'root'
})
export class TournamentParticipantService {
  private url = environment.BASE_API_URL;

  constructor(private http: HttpClient) {
  }

  getTournamentParticipantByTournament(tournamentId: number): Observable<TournamentParticipant[]> {
    const targetURL = this.url + 'tournamentParticipants/tournament/' + tournamentId;
    return this.http.get<Team>(targetURL).pipe( map(
      response => { return mapJSONToTournamentParticipantArray(response);
      }
    ));
  }

  createTournamentParticipant(tp: TournamentParticipant): Observable<TournamentParticipant> {
    const targetURL = this.url + 'tournamentParticipants';
    return this.http.post<Team>(targetURL, tp).pipe(
       map(
      response => {
        return mapJSONToTournamentParticipant(response);
      }
    ));
  }

  deleteTournamentParticipant(tournamentParticipant: TournamentParticipant): Observable<TournamentParticipant> {
    const targetURL = this.url + 'tournamentParticipants/' + tournamentParticipant.getId();
    return this.http.delete<TournamentParticipant>(targetURL).pipe( map(
      () => {
        return tournamentParticipant;
      }
    ));
  }
}
