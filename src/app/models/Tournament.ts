import {Lanparty} from './Lanparty';
import {GameMode} from './GameMode';
import {TournamentType} from './TournamentType';

// TODO add registarion StartDate + EndDate
export class Tournament {
  public id: number;
  public name: string;
  public lanparty: Lanparty;
  public gameMode: GameMode;
  public tournamentType: TournamentType;
  public teamRegistration: boolean;
  public numberOfParticipants: number;
  public published: boolean;
  public started: boolean;
  public startDate: Date;
  public finished: boolean;

  constructor(id: number, name: string, lanparty: Lanparty, gameMode: GameMode, tournamentType: TournamentType,
              teamRegistration: boolean, numberOfParticipants: number, published: boolean, started: boolean,
              startDate: Date, finished: boolean) {
    this.id = id;
    this.name = name;
    this.lanparty = lanparty;
    this.gameMode = gameMode;
    this.tournamentType = tournamentType;
    this.teamRegistration = teamRegistration;
    this.numberOfParticipants = numberOfParticipants;
    this.published = published;
    this.started = started;
    this.startDate = startDate;
    this.finished = finished;
    // TODO prices, time,
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getLanparty() {
    return this.lanparty;
  }

  getGameMode() {
    return this.gameMode;
  }

  getTournamentType() {
    return this.tournamentType;
  }

  getTeamRegistration() {
    return this.teamRegistration;
  }

  getNumberOfParticipants() {
    return this.numberOfParticipants;
  }

  getPublished() {
    return this.published;
  }

  getStarted() {
    return this.started;
  }

  getStartDate() {
    return this.startDate;
  }

  getFinished() {
    return this.finished;
  }

  getStatus() {
    if (this.published) {
      return 'Veröffentlicht';
    } else if (this.started) {
      return 'Gestartet';
    } else if (this.finished) {
      return 'Beendet';
    } else {
      return 'Hidden';
    }
  }

  setName(name: string) {
    this.name = name;
  }

  setLanparty(lanparty: Lanparty) {
    this.lanparty = lanparty;
  }

}
