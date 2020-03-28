export class Lanparty {
  private name: string;
  private active: boolean;
  private startDate: Date;
  private endDate: Date;

  constructor(name: string, active: boolean, startDate: Date, endDate: Date) {
    this.name = name;
    this.active = active;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getName() {
    return this.name;
  }

  getActive() {
    return this.active;
  }

  getStartDate() {
    return this.startDate
  }

  getEndDate() {
    return this.endDate
  }
}
