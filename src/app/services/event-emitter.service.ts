import {Injectable} from '@angular/core';
import {TournamentParticipant} from '../models/TournamentParticipant';
import {Subject} from 'rxjs';
import {WebSocketService} from './web-socket.service';
import {WebSocketEvent} from '../models/WebSocketEvent';
import {
  mapJSONToAppSettingsArray,
  mapJSONToTeam,
  mapJSONToTeamMember,
  mapJSONToTournamentParticipant
} from '../util/mapperFunctions';
import {Team} from '../models/Team';
import {TeamMember} from '../models/TeamMember';
import {NavBarItem} from '../models/NavBarItem';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  public appConfigChangedSubject = new Subject<NavBarItem[]>();
  public appConfigChangedObservable = this.appConfigChangedSubject.asObservable();

  private tournamentParticipantJoinedSubject = new Subject<TournamentParticipant>();
  public tournamentParticipantJoinedObservable = this.tournamentParticipantJoinedSubject.asObservable();

  private tournamentParticipantLeftSubject = new Subject<TournamentParticipant>();
  public tournamentParticipantLeftObservable = this.tournamentParticipantLeftSubject.asObservable();

  private createTeamSubject = new Subject<Team>();
  public createTeamSubjectObservable = this.createTeamSubject.asObservable();

  private teamMemberJoinedSubject = new Subject<TeamMember>();
  public teamMemberJoinedObservable = this.teamMemberJoinedSubject.asObservable();

  private teamMemberLeftSubject = new Subject<TeamMember>();
  public teamMemberLeftObservable = this.teamMemberLeftSubject.asObservable();

  private teamDeletedSubject = new Subject<Team>();
  public teamDeletedObservable = this.teamDeletedSubject.asObservable();

  constructor(private ws: WebSocketService) {
    ws.eventObservable.subscribe( msg => {
      const event = msg as WebSocketEvent;
      console.log(msg);

      switch (event.event) {
        case 'AppConfigChangedEvent': {
          this.appConfigChangedSubject.next(mapJSONToAppSettingsArray(event.data));
          break;
        }

        case 'TournamentParticipantJoinedEvent': {
          this.tournamentParticipantJoinedSubject.next(mapJSONToTournamentParticipant(event.data));
          break;
        }

        case 'TournamentParticipantLeftEvent': {
          this.tournamentParticipantLeftSubject.next(mapJSONToTournamentParticipant(event.data));
          break;
        }

        case 'TeamCreatedEvent': {
          this.createTeamSubject.next(mapJSONToTeam(event.data));
          break;
        }

        case 'TeamMemberJoinedEvent': {
          console.log('switch case');
          this.teamMemberJoinedSubject.next(mapJSONToTeamMember(event.data));
          break;
        }

        case 'TeamMemberLeftEvent': {
          this.teamMemberLeftSubject.next(mapJSONToTeamMember(event.data));
          break;
        }

        case 'TeamDeletedEvent': {
          this.teamDeletedSubject.next(mapJSONToTeam(event.data));
          break;
        }
      }
    });
  }

}
