import {TournamentParticipant} from './TournamentParticipant';

export interface WebSocketEvent {
  event: string;
  data: any;
}

export class TournamentParticipantJoinedEvent implements WebSocketEvent {
  event = 'TournamentParticipantJoinedEvent';
  data: TournamentParticipant;

  constructor(data: TournamentParticipant) {
    this.data = data;
  }
}

export class TournamentParticipantLeftEvent implements WebSocketEvent {
  event = 'TournamentParticipantLeftEvent';
  data: TournamentParticipant;

  constructor(data: TournamentParticipant) {
    this.data = data;
  }
}
