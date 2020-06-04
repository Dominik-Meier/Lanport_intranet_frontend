export class Team {
  private id: number;
  private name: string;
  private pin: number;


  constructor(id: number, name: string, pin: number) {
    this.id = id;
    this.name = name;
    this.pin = pin;

  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPin() {
    return this.pin;
  }

  setName(name: string) {
    this.name = name;
  }

  setPin(pin: number) {
    this.pin = pin;
  }
}
