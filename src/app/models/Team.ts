import {Tournament} from "./Tournament";

export class Team {
  private id: number;
  public name: string;
  public pin: number;
  public tournament: Tournament;

  constructor(id: number, name: string, pin: number, tournament: Tournament) {
    this.id = id;
    this.name = name;
    this.pin = pin;
    this.tournament = tournament;
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

  setName(name: string) {
    this.name = name;
  }

  setPin(pin: number) {
    this.pin = pin;
  }

  setTournament(tournament: Tournament) {
    this.tournament = tournament;
  }
}
