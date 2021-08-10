import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Team} from '../../models/Team';
import {map} from 'rxjs/operators';
import {TournamentService} from './tournament.service';
import {TeamMemberService} from './team-member.service';
import {TeamMember} from '../../models/TeamMember';
import {AuthService} from '../auth-service.service';
import {mapJSONToTeamArray} from '../../util/mapperFunctions';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url = environment.BASE_API_URL;

  constructor(private http: HttpClient,
              private tournamentService: TournamentService,
              private teamMemberService: TeamMemberService,
              private authService: AuthService) { }

  getTeamByTournament(tournamentId: number): Observable<Team[]> {
    const targetURL = this.url + 'teams/tournament/' + tournamentId;
    return this.http.get<Team[]>(targetURL).pipe( map(
      response => {
        const teams = mapJSONToTeamArray(response);
        return teams;
      }
    ));
  }

  createTeam(team: Team): Observable<Team> {
    const targetURL = this.url + 'teams';
    team.addTeamMember(new TeamMember(null, null, this.authService.getActiveUser()));
    return this.http.post<Team>(targetURL, team);
  }

  joinTeam(team: Team, pin: string): void {
    const tm = new TeamMember(null, team.getId(), this.authService.getActiveUser());
    this.teamMemberService.createTeamMember(tm, pin).subscribe();
  }

  leaveTeam(team: Team, tm: TeamMember): void {
    this.teamMemberService.deleteTeamMember(tm).subscribe();
  }
}
