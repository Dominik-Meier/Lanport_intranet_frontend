import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Team} from '../../models/Team';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth-service.service';
import {TournamentParticipant} from '../../models/TournamentParticipant';
import {EventEmitterService} from "../event-emitter.service";

@Injectable({
  providedIn: 'root'
})
export class TournamentParticipantService {
  private url = environment.BASE_API_URL;

  constructor(private http: HttpClient,
              private authServices: AuthService,
              private eventEmitter: EventEmitterService) { }

  getTournamentParticipantByTournament(tournamentId: number): Observable<TournamentParticipant[]> {
    const targetURL = this.url + 'tournamentParticipants/tournament/' + tournamentId;
    return this.http.get<Team>(targetURL).pipe( map(
      response => {
        console.log(response);
        const tournamentParticipant = this.mapJSONToTournamentParticipantArray(response);
        return tournamentParticipant;
      }
    ));

    return null;
  }

  createTournamentParticipant(tp: TournamentParticipant): Observable<TournamentParticipant> {
    const targetURL = this.url + 'tournamentParticipants';
    return this.http.post<Team>(targetURL, tp).pipe( map(
      response => {
        const tournamentParticipant = this.mapJSONToTournamentParticipant(response);
        this.eventEmitter.tournamentParticipantJoinedSubject.next(tournamentParticipant);
        return tournamentParticipant;
      }
    ));
  }

  deleteTournamentParticipant(tournamentParticipant: TournamentParticipant): Observable<TournamentParticipant> {
    const targetURL = this.url + 'tournamentParticipants/' + tournamentParticipant.getId();
    return this.http.delete<TournamentParticipant>(targetURL).pipe( map(
      () => {
        this.eventEmitter.tournamentParticipantLeftSubject.next(tournamentParticipant);
        return tournamentParticipant;
      }
    ));
  }

  mapJSONToTournamentParticipant(data: any): TournamentParticipant {
    return new TournamentParticipant(data.id, data.teamId, this.authServices.mapJsonToUser(data.user));
  }

  mapJSONToTournamentParticipantArray(data: any): TournamentParticipant[] {
    const tournamentParticipant: TournamentParticipant[] = [];
    if (data) {
      for ( const tm of data) {
        tournamentParticipant.push( this.mapJSONToTournamentParticipant(tm));
      }
    }
    return tournamentParticipant;
  }
}
