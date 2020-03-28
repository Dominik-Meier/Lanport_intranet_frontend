import { Type} from "@angular/core";

export class NavBarItem {
  private name: string;
  private options: string[];
  private active: boolean;
  private component: Type<any>;

  constructor(name: string, options: string[], component: Type<any> = null) {
    this.name = name;
    this.options = options;
    this.active = false;
    this.component = component;
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
