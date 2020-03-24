export class User {
  private name: string;
  private rights: [];

  constructor(name: string, rights: []) {
    this.name = name;
    this.rights = rights;
  }

  getName() {
    return this.name;
  }
}
