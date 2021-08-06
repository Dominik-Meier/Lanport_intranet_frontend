import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Team} from '../../models/Team';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../auth-service.service';
import {TournamentParticipant} from '../../models/TournamentParticipant';
import {EventEmitterService} from '../event-emitter.service';
import {WebSocketService} from '../web-socket.service';
import {TournamentParticipantJoinedEvent, TournamentParticipantLeftEvent} from "../../models/WebSocketEvents";
import {mapJSONToTournamentParticipant, mapJSONToTournamentParticipantArray} from "../../util/mapperFunctions";

@Injectable({
  providedIn: 'root'
})
export class TournamentParticipantService {
  private url = environment.BASE_API_URL;

  constructor(private http: HttpClient,
              private authServices: AuthService,
              private eventEmitter: EventEmitterService,
              private ws: WebSocketService) {
  }

  getTournamentParticipantByTournament(tournamentId: number): Observable<TournamentParticipant[]> {
    const targetURL = this.url + 'tournamentParticipants/tournament/' + tournamentId;
    return this.http.get<Team>(targetURL).pipe(
      map(
      response => {
        console.log(response);
        return mapJSONToTournamentParticipantArray(response);
      }
    ));

    return null;
  }

  createTournamentParticipant(tp: TournamentParticipant): Observable<TournamentParticipant> {
    const targetURL = this.url + 'tournamentParticipants';
    return this.http.post<Team>(targetURL, tp).pipe(
      catchError(this.handleError),
      map(
      response => {
        const tournamentParticipant = mapJSONToTournamentParticipant(response);
        const event = new TournamentParticipantJoinedEvent(tournamentParticipant);
        this.ws.send(event);
        return tournamentParticipant;
      }
    ));
  }

  deleteTournamentParticipant(tournamentParticipant: TournamentParticipant): Observable<TournamentParticipant> {
    const targetURL = this.url + 'tournamentParticipants/' + tournamentParticipant.getId();
    return this.http.delete<TournamentParticipant>(targetURL).pipe( map(
      () => {
        const event = new TournamentParticipantLeftEvent(tournamentParticipant);
        this.ws.send(event);
        return tournamentParticipant;
      }
    ));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
