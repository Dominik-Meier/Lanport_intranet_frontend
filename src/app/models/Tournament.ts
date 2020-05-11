import {Lanparty} from "./Lanparty";
import {GameMode} from "./GameMode";
import {TournamentType} from "./TournamentType";

//TODO add registarion StartDate + EndDate
export class Tournament {
  private id: number;
  private name: string;
  private lanparty: Lanparty;
  private gameMode: GameMode;
  private tournamentType: TournamentType;
  private teamRegistration: boolean;
  private numberOfParticipants: number;
  private published: boolean;
  private started: boolean;
  private startDate: Date;
  private finished: boolean;

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
    //TODO prices, time,
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  setLanparty(lanparty: Lanparty) {
    this.lanparty = lanparty;
  }

}
