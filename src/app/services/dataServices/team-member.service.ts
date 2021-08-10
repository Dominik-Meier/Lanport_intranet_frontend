import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Team} from '../../models/Team';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TeamMember} from '../../models/TeamMember';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth-service.service';
import {mapJSONToTeamMember} from '../../util/mapperFunctions';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {
  private url = environment.BASE_API_URL;

  constructor(private http: HttpClient,
              private authServices: AuthService) { }

  createTeamMember(teamMember: TeamMember, pin: string) {
    const targetURL = this.url + 'teamMembers';
    const params = new HttpParams().set('pin', pin);
    return this.http.post<Team>(`${targetURL}?${params.toString()}`, teamMember);
  }

  updateTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    console.log('not supperted yet');
    return null;
  }

  deleteTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    console.log('before server request', teamMember);
    const targetURL = this.url + 'teamMembers/' + teamMember.getId();
    return this.http.delete<TeamMember>(targetURL).pipe( map(
      response => {
        console.log('server response from delete tm');
        return teamMember;
      }
    ));
  }

}
