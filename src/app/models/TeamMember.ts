import {User} from './User';

export class TeamMember {
  readonly id: number;
  public teamId: number;
  public user: User;

  constructor(id: number, teamId: number, user: User) {
    this.id = id;
    this.teamId = teamId;
    this.user = user;
  }

  getId() {
    return this.id;
  }

  getTeamId() {
    return this.teamId;
  }

  getUser() {
    return this.user;
  }

}
