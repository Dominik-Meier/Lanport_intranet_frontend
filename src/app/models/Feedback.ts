import {User} from './User';

export class Feedback {
  public id: number;
  public wasGood: string;
  public wasBad: string;
  public suggestions: string;
  public isPublic: boolean;
  public isAnonymous: boolean;
  public userId: number;
  public user: User;
  public lanpartyId: number;


  constructor(id: number, wasGood: string, wasBad: string, suggestions: string, isPublic: boolean, isAnonymous: boolean,
              userId: number, user: User, lanpartyId: number) {
    this.id = id;
    this.wasGood = wasGood;
    this.wasBad = wasBad;
    this.suggestions = suggestions;
    this.isPublic = isPublic;
    this.isAnonymous = isAnonymous;
    this.userId = userId;
    this.user = user;
    this.lanpartyId = lanpartyId;
  }
}
