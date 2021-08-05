export class User {
  id: number;
  name: string;
  registered: boolean;
  payed: boolean;
  seat: string;
  rights: string;

  constructor(id: number, name: string, registered: boolean, payed: boolean, seat: string, rights: string) {
    this.id = id;
    this.name = name;
    this.registered = registered;
    this.payed = payed;
    this.seat = seat;
    this.rights = rights;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getSeat() {
    return this.seat;
  }

  getRights() {
    return this.rights;
  }
}
