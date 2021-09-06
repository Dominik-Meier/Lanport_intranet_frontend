import {Injectable} from '@angular/core';
import {TournamentParticipant} from '../models/TournamentParticipant';
import {Subject} from 'rxjs';
import {WebSocketService} from './web-socket.service';
import {WebSocketEvent} from '../models/WebSocketEvent';
import {
  mapJSONToAppSettingsArray, mapJSONToGameMode, mapJSONToLanpartyArray, mapJSONToLanparty,
  mapJSONToTeam,
  mapJSONToTeamMember, mapJSONToTournament, mapJSONToTournamentArray,
  mapJSONToTournamentParticipant, mapJSONToTournamentType, mapJSONToGameModeArray, mapJSONToTournamentTypeArray
} from '../util/mapperFunctions';
import {Team} from '../models/Team';
import {TeamMember} from '../models/TeamMember';
import {NavBarItem} from '../models/NavBarItem';
import {Tournament} from '../models/Tournament';
import {TournamentType} from '../models/TournamentType';
import {GameMode} from '../models/GameMode';
import {Lanparty} from '../models/Lanparty';

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

  private tournamentsUpdatedSubject = new Subject<Tournament[]>();
  public tournamentsUpdatedObservable = this.tournamentsUpdatedSubject.asObservable();

  private tournamentDeletedSubject = new Subject<Tournament>();
  public tournamentDeletedObservable = this.tournamentDeletedSubject.asObservable();

  private tournamentTypesUpdatedSubject = new Subject<TournamentType[]>();
  public tournamentTypesUpdatedObservable = this.tournamentTypesUpdatedSubject.asObservable();

  private tournamentTypeDeletedSubject = new Subject<TournamentType>();
  public tournamentTypeDeletedObservable = this.tournamentTypeDeletedSubject.asObservable();

  private gameModesUpdatedSubject = new Subject<GameMode[]>();
  public gameModesUpdatedObservable = this.gameModesUpdatedSubject.asObservable();

  private gameModeDeletedSubject = new Subject<GameMode>();
  public gameModeDeletedObservable = this.gameModeDeletedSubject.asObservable();

  private lanpartiesUpdatedSubject = new Subject<Lanparty[]>();
  public lanpartiesUpdatedObservable = this.lanpartiesUpdatedSubject.asObservable();

  private lanpartyDeletedSubject = new Subject<Lanparty>();
  public lanpartyDeletedObservable = this.lanpartyDeletedSubject.asObservable();

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

        case 'TournamentsUpdatedEvent': {
          this.tournamentsUpdatedSubject.next(mapJSONToTournamentArray(event.data));
          break;
        }

        case 'TournamentDeletedEvent': {
          this.tournamentDeletedSubject.next(mapJSONToTournament(event.data));
          break;
        }

        case 'TournamentTypesUpdatedEvent': {
          this.tournamentTypesUpdatedSubject.next(mapJSONToTournamentTypeArray(event.data));
          break;
        }

        case 'TournamentTypeDeletedEvent': {
          this.tournamentTypeDeletedSubject.next(mapJSONToTournamentType(event.data));
          break;
        }

        case 'GameModesUpdatedEvent': {
          this.gameModesUpdatedSubject.next(mapJSONToGameModeArray(event.data));
          break;
        }

        case 'GameModeDeletedEvent': {
          this.gameModeDeletedSubject.next(mapJSONToGameMode(event.data));
          break;
        }

        case 'LanpartiesUpdatedEvent': {
          this.lanpartiesUpdatedSubject.next(mapJSONToLanpartyArray(event.data));
          break;
        }

        case 'LanpartyDeletedEvent': {
          this.lanpartyDeletedSubject.next(mapJSONToLanparty(event.data));
          break;
        }
      }
    });
  }

}
