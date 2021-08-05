import {Injectable} from '@angular/core';
import {TournamentParticipant} from '../models/TournamentParticipant';
import {Subject} from 'rxjs';
import {WebSocketService} from './web-socket.service';
import {WebSocketEvent} from '../models/WebSocketEvents';
import {TournamentParticipantService} from "./dataServices/tournamentParticipant.service";
import {mapJSONToTournamentParticipant} from "../util/mapperFunctions";

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  public tournamentParticipantJoinedSubject = new Subject<TournamentParticipant>();
  public tournamentParticipantJoinedObservable = this.tournamentParticipantJoinedSubject.asObservable();
  public tournamentParticipantLeftSubject = new Subject<TournamentParticipant>();
  public tournamentParticipantLeftObservable = this.tournamentParticipantLeftSubject.asObservable();

  constructor(private ws: WebSocketService) {
    ws.eventObservable.subscribe( msg => {
      const event = msg as WebSocketEvent;
      console.log(event.event);
      console.log(event.data);

      switch (event.event) {
        case 'TournamentParticipantJoinedEvent': {
          this.tournamentParticipantJoinedSubject.next(mapJSONToTournamentParticipant(event.data));
          break;
        }

        case 'TournamentParticipantLeftEvent': {
          this.tournamentParticipantLeftSubject.next(mapJSONToTournamentParticipant(event.data));
          break;
        }
      }
    });
  }

}
