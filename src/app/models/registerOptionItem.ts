import { Type} from "@angular/core";

export class RegisterOptionItem {
  private name: string;
  private active: boolean;
  private component: Type<any>;

  constructor(name: string, component: Type<any> = null) {
    this.name = name;
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
