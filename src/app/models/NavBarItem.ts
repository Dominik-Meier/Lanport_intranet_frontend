export class NavBarItem {
  private name: string;
  private options: string[];
  private active: boolean;

  constructor(name: string, options: string[]) {
    this.name = name;
    this.options = options;
    this.active = false;
  }

  getName() {
    return this.name;
  }

  getActive() {
    return this.active;
  }

  setActive(active: boolean) {
    this.active = active;
  }
}
