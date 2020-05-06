export class GameMode {
  private id: number;
  private name: string;
  private game: string;
  private rules: any;

  constructor(id: number, name: string, game: boolean, rules: any) {
    this.id = id;
    this.name = name;
    this.game = game;
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

  getRules() {
    return this.rules;
  }

  setName(name: string) {
    this.name = name;
  }

  setGame(game: string) {
    this.game = game;
  }

  setRules(rules: any) {
    this.rules = rules;
  }
}
