export class NavBarItem {
  private name: string;
  private options: string[];

  constructor(name: string, options: string[]) {
    this.name = name;
    this.options = options;
  }

  getName() {
    return this.name;
  }
}
