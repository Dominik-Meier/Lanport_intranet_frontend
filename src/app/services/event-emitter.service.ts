import {Injectable} from '@angular/core';
import {TournamentParticipant} from '../models/TournamentParticipant';
import {Subject} from 'rxjs';
import {WebSocketService} from './web-socket.service';
import {WebSocketEvent} from '../models/WebSocketEvent';
import {
  mapJSONToAppSettingsArray,
  mapJSONToGameMode,
  mapJSONToLanpartyArray,
  mapJSONToLanparty,
  mapJSONToTeam,
  mapJSONToTeamMember,
  mapJSONToTournament,
  mapJSONToTournamentArray,
  mapJSONToTournamentParticipant,
  mapJSONToTournamentType,
  mapJSONToGameModeArray,
  mapJSONToTournamentTypeArray,
  mapJSONToFeedback, mapJSONToMeal, mapJSONToMealOption
} from '../util/mapperFunctions';
import {Team} from '../models/Team';
import {TeamMember} from '../models/TeamMember';
import {NavBarItem} from '../models/NavBarItem';
import {Tournament} from '../models/Tournament';
import {TournamentType} from '../models/TournamentType';
import {GameMode} from '../models/GameMode';
import {Lanparty} from '../models/Lanparty';
import {Feedback} from '../models/Feedback';
import {Meal} from '../models/meal';
import {MealOption} from '../models/MealOption';

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

  private feedbackCreatedSubject = new Subject<Feedback>();
  public feedbackCreatedObservable = this.feedbackCreatedSubject.asObservable();

  private feedbackUpdatedSubject = new Subject<Feedback>();
  public feedbackUpdatedObservable = this.feedbackUpdatedSubject.asObservable();

  private feedbackDeletedSubject = new Subject<Feedback>();
  public feedbackDeletedObservable = this.feedbackDeletedSubject.asObservable();

  private mealCreatedSubject = new Subject<Meal>();
  public mealCreatedObservable = this.mealCreatedSubject.asObservable();

  private mealUpdatedSubject = new Subject<Meal>();
  public mealUpdatedObservable = this.mealUpdatedSubject.asObservable();

  private mealDeletedSubject = new Subject<Meal>();
  public mealDeletedObservable = this.mealDeletedSubject.asObservable();

  private mealOptionCreatedSubject = new Subject<MealOption>();
  public mealOptionCreatedObservable = this.mealOptionCreatedSubject.asObservable();

  private mealOptionUpdatedSubject = new Subject<MealOption>();
  public mealOptionUpdatedObservable = this.mealOptionUpdatedSubject.asObservable();

  private mealOptionDeletedSubject = new Subject<MealOption>();
  public mealOptionDeletedObservable = this.mealOptionDeletedSubject.asObservable();


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

        case 'FeedbackCreatedEvent': {
          this.feedbackCreatedSubject.next(mapJSONToFeedback(event.data));
          break;
        }

        case 'FeedbackUpdatedEvent': {
          this.feedbackUpdatedSubject.next(mapJSONToFeedback(event.data));
          break;
        }

        case 'FeedbackDeletedEvent': {
          this.feedbackDeletedSubject.next(mapJSONToFeedback(event.data));
          break;
        }

        case 'MealCreatedEvent': {
          this.mealCreatedSubject.next(mapJSONToMeal(event.data));
          break;
        }

        case 'MealUpdatedEvent': {
          this.mealUpdatedSubject.next(mapJSONToMeal(event.data));
          break;
        }

        case 'MealDeletedEvent': {
          this.mealDeletedSubject.next(mapJSONToMeal(event.data));
          break;
        }

        case 'MealOptionCreatedEvent': {
          this.mealOptionCreatedSubject.next(mapJSONToMealOption(event.data));
          break;
        }

        case 'MealOptionUpdatedEvent': {
          this.mealOptionUpdatedSubject.next(mapJSONToMealOption(event.data));
          break;
        }

        case 'MealOptionDeletedEvent': {
          this.mealOptionDeletedSubject.next(mapJSONToMealOption(event.data));
          break;
        }
      }
    });
  }

}
