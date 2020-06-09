import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Team} from "../../models/Team";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TournamentService} from "./tournament.service";
import {TeamMember} from "../../models/TeamMember";
import {map} from "rxjs/operators";
import {AuthService} from "../auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {
  private url = environment.BASE_API_URL;

  private teamMemberSubject = new Subject<TeamMember>();
  public getTeamMemberObservable = this.teamMemberSubject.asObservable();

  constructor(private http: HttpClient,
              private authServices: AuthService) { }


  getAllTeamMembers(): Observable<TeamMember[]> {
    console.log('not supperted yet');
    return null;
  }

  getTeamMemberById(teamMemberId: number): Observable<TeamMember> {
    console.log('not supperted yet');
    return null;
  }

  getTeamMembersByTournament(tournamentId: number): Observable<TeamMember[]> {
    console.log('not supperted yet');
    return null;
  }

  getTeamMembersByTeam(teamId: number): Observable<TeamMember[]> {
    console.log('not supperted yet');
    return null;
  }

  getTeamMembersByUser(userId: number): Observable<TeamMember[]> {
    console.log('not supperted yet');
    return null;
  }

  createTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    const targetURL = this.url + 'teamMembers';
    return this.http.post<Team>(targetURL, teamMember).pipe( map(
      response => {
        //TODO after create team add user which created the team
        const teamMember = this.mapJSONToTeamMember(response);
        this.teamMemberSubject.next(teamMember);
        return teamMember;
      }
    ));
  }

  updateTeamMember(teamMemver: TeamMember): Observable<TeamMember> {
    console.log('not supperted yet');
    return null;
  }

  deleteTeamMember(teamMemver: TeamMember): Observable<TeamMember> {
    console.log('not supperted yet');
    return null;
  }

  mapJSONToTeamMember(data: any): TeamMember {
    console.log(data);
    return new TeamMember(data.id, data.teamId, this.authServices.mapJsonToUser(data.user));
  }

  mapJSONToTeamMemberArray(data: any): TeamMember[] {
    const teamMembers: TeamMember[] = [];
    if (data) {
      for ( let tm of data) {
        teamMembers.push( this.mapJSONToTeamMember(tm));
      }
    }
    return teamMembers;
  }
}
