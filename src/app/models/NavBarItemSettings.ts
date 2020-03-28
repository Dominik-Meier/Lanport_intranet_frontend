import { Type} from "@angular/core";
import {RegisterOptionItem} from "./registerOptionItem";

export class NavBarItemSettings {
  private name: string;
  private options: RegisterOptionItem[];
  private active: boolean;
  private component: Type<any>;

  constructor(name: string, options: RegisterOptionItem[], component: Type<any> = null) {
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
