import {TournamentParticipant} from '../models/TournamentParticipant';
import {User} from '../models/User';

export function mapJSONToTournamentParticipant(data: any): TournamentParticipant {
  return new TournamentParticipant(data.id, data.tournamentId, mapJsonToUser(data.user));
}


export function mapJSONToTournamentParticipantArray(data: any): TournamentParticipant[] {
  const tournamentParticipant: TournamentParticipant[] = [];
  if (data) {
    for (const tm of data) {
      tournamentParticipant.push(mapJSONToTournamentParticipant(tm));
    }
  }
  return tournamentParticipant;
}

export function mapJsonToUser(data: any): User {
  return new User(data.id, data.nickname, data.registered, data.payed, data.seat, data.level);
}

