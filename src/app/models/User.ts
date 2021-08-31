export class User {
  id: number;
  nickname: string;
  registered: boolean;
  payed: boolean;
  seat: string;
  level: string;
  /**
   * Is never mapped to the user json object from the request
   */
  token: string;
  /**
   * Is never mapped to the user json object from the request
   */
  refreshToken: string;

  constructor(id: number, name: string, registered: boolean, payed: boolean, seat: string, level: string) {
    this.id = id;
    this.nickname = name;
    this.registered = registered;
    this.payed = payed;
    this.seat = seat;
    this.level = level;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.nickname;
  }

  getSeat() {
    return this.seat;
  }

  getLevel() {
    return this.level;
  }
}
