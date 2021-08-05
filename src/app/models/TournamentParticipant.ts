import {User} from './User';

export class TournamentParticipant {
  readonly id: number;
  public tournamentId: number;
  public user: User;

  constructor(id: number, tournamentId: number, user: User) {
    this.id = id;
    this.tournamentId = tournamentId;
    this.user = user;
  }

  getId() {
    return this.id;
  }

  getTeamId() {
    return this.tournamentId;
  }

  getUser() {
    return this.user;
  }

}
