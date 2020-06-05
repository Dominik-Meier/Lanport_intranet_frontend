import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GameMode} from "../../models/GameMode";
import {Observable, Subject} from "rxjs";
import {Team} from "../../models/Team";
import {map} from "rxjs/operators";
import {TournamentService} from "./tournament.service";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url = environment.BASE_API_URL;

  private TeamSubject = new Subject<Team>();
  public getTeamObservable = this.TeamSubject.asObservable();

  constructor(private http: HttpClient,
              private tournamentService: TournamentService) { }

  getAllTeam(): Observable<Team[]> {
    console.log('not supperted yet');
    return null;
  }

  getTeamByTournmant(tournamentId: number): Observable<Team[]> {
    console.log('not supperted yet');
    return null;
  }

  getTeamByUser(userId: number): Observable<Team[]> {
    console.log('not supperted yet');
    return null;
  }

  createTeam(team: Team): Observable<Team> {
    const targetURL = this.url + 'teams';
    return this.http.post<Team>(targetURL, team).pipe( map(
      response => {
        const team = this.mapJSONToTeam(response);
        this.TeamSubject.next(team);
        return team;
      }
    ));
  }

  updateTeam(team: Team): Observable<Team> {
    console.log('not supperted yet');
    return null;
  }

  deleteTeam(team: Team): Observable<Team> {
    console.log('not supperted yet');
    return null;
  }


  mapJSONToTeam(data: any): Team {
    return new Team(data.id, data.name, data.pin, this.tournamentService.mapJSONToTournament(data.tournament));
  }
}
