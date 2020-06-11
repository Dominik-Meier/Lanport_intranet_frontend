import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GameMode} from "../../models/GameMode";
import {Observable, Subject} from "rxjs";
import {Team} from "../../models/Team";
import {map} from "rxjs/operators";
import {TournamentService} from "./tournament.service";
import {User} from "../../models/User";
import {TeamMemberService} from "./team-member.service";
import {TeamMember} from "../../models/TeamMember";
import {AuthService} from "../auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url = environment.BASE_API_URL;

  private TeamSubject = new Subject<Team>();
  public getTeamObservable = this.TeamSubject.asObservable();

  constructor(private http: HttpClient,
              private tournamentService: TournamentService,
              private teamMemberService: TeamMemberService,
              private authService: AuthService) { }

  getAllTeam(): Observable<Team[]> {
    console.log('not supperted yet');
    return null;
  }

  getTeamByTournament(tournamentId: number): Observable<Team[]> {
    const targetURL = this.url + 'teams/tournament/' + tournamentId;
    return this.http.get<Team[]>(targetURL).pipe( map(
      response => {
        const teams = this.mapJSONToTeamArray(response);
        return teams;
      }
    ));
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
        const addTeamMember = new TeamMember(null, team.getId(), this.authService.getActiveUser());
        this.teamMemberService.createTeamMember(addTeamMember).subscribe( teamMember => {
          team.addTeamMember(teamMember);
        });
        return team;
      }
    ));
  }

  joinTeam(team: Team): void {
    const tm = new TeamMember(null, team.getId(), this.authService.getActiveUser());
    this.teamMemberService.createTeamMember(tm).subscribe( res => {
      team.addTeamMember(res);
      this.TeamSubject.next(team);
    })
  }

  leaveTeam(team: Team, tm: TeamMember): void {
    this.teamMemberService.deleteTeamMember(tm).subscribe( res => {
      team.removeTeamMember(tm);
      this.TeamSubject.next(team);
    })
  }

  updateTeam(team: Team): Observable<Team> {
    console.log('not supperted yet');
    return null;
  }

  deleteTeam(team: Team): Observable<Team> {
    console.log('not supperted yet');
    return null;
  }

  mapJSONToTeamArray(data: any): Team[] {
    const teams: Team[] = [];
    console.log(data);
    if (data) {
      for (let team of data) {
        teams.push(this.mapJSONToTeam(team));
      }
    }
    return teams;
  }

  mapJSONToTeam(data: any): Team {
    console.log(data);
    return new Team(data.id, data.name, data.pin, this.tournamentService.mapJSONToTournament(data.tournament),
      this.teamMemberService.mapJSONToTeamMemberArray(data.teamMembers));
  }
}
