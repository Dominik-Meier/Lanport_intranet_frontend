import {DynamicComponentDataProvider} from "./interfaces/dynamicComponentDataProvider";
import {ComponentWithNameComponent} from "../components/interfaces/componentWithName.component";

/**
 * Is appComponent at backend
 */
export class RegisterOptionItem implements DynamicComponentDataProvider {
  private id: number;
  private name: string;
  public usedComponent: ComponentWithNameComponent;
  private appRegisterComponentId: number;
  data: any;
  private activeForIntranet: boolean;
  private activeForBeamerPresentation: boolean;
  private active;

  constructor(id: number, name: string, data: any, usedComponent: ComponentWithNameComponent = null,
              appRegisterComponentId: number, activeForIntranet: boolean, activeForBeamerPresentation: boolean) {
    this.id = id;
    this.name = name;
    this.usedComponent = usedComponent;
    this.appRegisterComponentId = appRegisterComponentId;
    this.data = data;
    this.activeForIntranet = activeForIntranet;
    this.activeForBeamerPresentation = activeForBeamerPresentation;
    this.active = false;
  }

  setActive(active: boolean) {
    this.active = active;
  }

  getActive() {
    return this.active;
  }

  getName() {
    return this.name;
  }

  getData() {
    return this.data;
  }

  getComponent(): ComponentWithNameComponent {
    return this.usedComponent;
  }

  setName(name: string) {
    this.name = name;
  }

  setData(data: any) {
    this.data = data;
  }


  toJSON() {
    const name = this.usedComponent ? this.usedComponent.componentName : '';
    return {
      id: this.id,
      name: this.name,
      usedComponent: name,
      appRegisterComponentId: this.appRegisterComponentId,
      data: this.data,
      activeForIntranet: this.activeForIntranet,
      activeForBeamerPresentation: this.activeForBeamerPresentation
    };
  }
}
