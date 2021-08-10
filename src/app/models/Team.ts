import {Tournament} from "./Tournament";
import {TeamMember} from "./TeamMember";

export class Team {
  public id: number;
  public name: string;
  public pin: number;
  public tournament: Tournament;
  public teamMembers: TeamMember[];

  constructor(id: number, name: string, pin: number, tournament: Tournament, teamMembers: TeamMember[]) {
    this.id = id;
    this.name = name;
    this.pin = pin;
    this.tournament = tournament;
    this.teamMembers = teamMembers;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPin() {
    return this.pin;
  }

  getTournament() {
    return this.tournament;
  }

  getTeamMembers() {
    return this.teamMembers;
  }

  setName(name: string) {
    this.name = name;
  }

  setPin(pin: number) {
    this.pin = pin;
  }

  setTournament(tournament: Tournament) {
    this.tournament = tournament;
  }

  setTeamMembers(tm: TeamMember[]) {
    this.teamMembers = tm;
  }

  addTeamMember(tm: TeamMember) {
    this.teamMembers.push(tm);
  }

  removeTeamMember(tm: TeamMember) {
    const tmIndex = this.teamMembers.findIndex( x => x.getId() === tm.getId());
    if (tmIndex !== null) {
      this.teamMembers.splice(tmIndex, 1);
    }
  }
}
