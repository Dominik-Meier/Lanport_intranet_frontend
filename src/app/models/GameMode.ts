export class GameMode {
  private id: number;
  private name: string;
  private game: string;
  private teamSize: number;
  private rules: any;

  constructor(id: number, name: string, game: string, teamSize: number, rules: any) {
    this.id = id;
    this.name = name;
    this.game = game;
    this.teamSize = teamSize;
    this.rules = rules;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getGame() {
    return this.game;
  }

  getTeamSize() {
    return this.teamSize;
  }

  getRules() {
    return this.rules;
  }

  setName(name: string) {
    this.name = name;
  }

  setGame(game: string) {
    this.game = game;
  }

  setTeamSize(teamSize: number) {
    this.teamSize = teamSize;
  }

  setRules(rules: any) {
    this.rules = rules;
  }
}
