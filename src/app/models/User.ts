export class User {
  private id: number;
  private name: string;
  private registered: boolean;
  private payed: boolean;
  private seat: string;
  private rights: string;

  constructor(id: number, name: string, registered: boolean, payed: boolean, seat: string, rights: string) {
    this.id = id;
    this.name = name;
    this.registered = registered;
    this.payed = payed;
    this.seat = seat;
    this.rights = rights;
  }

  getName() {
    return this.name;
  }

  getRights() {
    return this.rights;
  }
}
