export class Lanparty {
  private id: number;
  private name: string;
  private active: boolean;
  private startDate: Date;
  private endDate: Date;

  constructor(id: number, name: string, active: boolean, startDate: Date, endDate: Date) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getActive() {
    return this.active;
  }

  getStartDate() {
    return this.startDate;
  }

  getEndDate() {
    return this.endDate;
  }

  setName(name: string) {
    this.name = name;
  }

  setActive(active: boolean) {
    this.active = active;
  }

  setStartDate(date: Date) {
    this.startDate = date;
  }

  setEndDate(date: Date) {
    this.endDate = date;
  }
}
