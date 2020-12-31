import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Team} from "../../models/Team";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TournamentService} from "./tournament.service";
import {TeamMember} from "../../models/TeamMember";
import {map} from "rxjs/operators";
import {AuthService} from "../auth-service.service";
import {TournamentParticipant} from "../../models/TournamentParticipant";

@Injectable({
  providedIn: 'root'
})
export class TournamentParticipantService {
  private url = environment.BASE_API_URL;

  private tournamentParticipantSubject = new Subject<TournamentParticipant>();
  public tournamentParticipantObservable = this.tournamentParticipantSubject.asObservable();

  constructor(private http: HttpClient,
              private authServices: AuthService) { }


  getAllTournamentParticipant(): Observable<TournamentParticipant[]> {
    console.log('not supperted yet');
    return null;
  }

  getTournamentParticipantId(tournamentParticipantId: number): Observable<TournamentParticipant> {
    console.log('not supperted yet');
    return null;
  }

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

  getTournamentParticipantByTeam(teamId: number): Observable<TournamentParticipant[]> {
    console.log('not supperted yet');
    return null;
  }

  getTournamentParticipantByUser(userId: number): Observable<TournamentParticipant[]> {
    console.log('not supperted yet');
    return null;
  }

  createTournamentParticipant(tournamentParticipant: TournamentParticipant): Observable<TournamentParticipant> {
    const targetURL = this.url + 'tournamentParticipants';
    return this.http.post<Team>(targetURL, tournamentParticipant).pipe( map(
      response => {
        const tournamentParticipant = this.mapJSONToTournamentParticipant(response);
        this.tournamentParticipantSubject.next(tournamentParticipant);
        return tournamentParticipant;
      }
    ));
  }

  updateTournamentParticipant(tournamentParticipant: TournamentParticipant): Observable<TournamentParticipant> {
    console.log('not supperted yet');
    return null;
  }

  deleteTeamMember(tournamentParticipant: TournamentParticipant): Observable<TournamentParticipant> {
    console.log('before server request', tournamentParticipant);
    const targetURL = this.url + 'tournamentParticipantv/' + tournamentParticipant.getId();
    return this.http.delete<TournamentParticipant>(targetURL).pipe( map(
      response => {
        console.log('server response from delete tm');
        return tournamentParticipant;
      }
    ));
  }

  mapJSONToTournamentParticipant(data: any): TournamentParticipant {
    console.log(data);
    return new TournamentParticipant(data.id, data.teamId, this.authServices.mapJsonToUser(data.user));
  }

  mapJSONToTournamentParticipantArray(data: any): TournamentParticipant[] {
    const tournamentParticipant: TournamentParticipant[] = [];
    if (data) {
      for ( let tm of data) {
        tournamentParticipant.push( this.mapJSONToTournamentParticipant(tm));
      }
    }
    return tournamentParticipant;
  }
}
