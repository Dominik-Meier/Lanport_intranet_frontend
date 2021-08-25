import {ComponentWithNameComponent} from '../components/interfaces/componentWithName.component';

/**
 * Is appRegisterComponent at backend
 */
export class NavBarItem {
  public id: number;
  public name: string;
  public usedComponent: ComponentWithNameComponent;
  public appComponentId: number;
  public appComponents: NavBarItem[];
  public data: any;
  public activeForIntranet: boolean;
  public activeForBeamerPresentation: boolean;
  public icon: string;
  public active: boolean;

  constructor(id: number, name: string, usedComponent: ComponentWithNameComponent, parentNavBarItem: number,
              appComponents: NavBarItem[] = [], data: any, activeForIntranet: boolean,
              activeForBeamerPresentation: boolean, icon: string, active: boolean) {
    this.id = id;
    this.name = name;
    this.usedComponent = usedComponent;
    this.appComponentId = parentNavBarItem;
    this.appComponents = appComponents ?? [];
    this.data = data;
    this.activeForIntranet = activeForIntranet;
    this.activeForBeamerPresentation = activeForBeamerPresentation;
    this.icon = icon;
    this.active = active;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getOptions(): any[] {
    return this.appComponents;
  }

  getActiveForIntranet(): boolean {
    return this.activeForIntranet;
  }

  getComponent() {
    return this.usedComponent;
  }

  setName(name: string) {
    this.name = name;
  }

  setActive(active: boolean) {
    this.active = active;
  }

  setActiveForIntranet(activeForIntranet: boolean) {
    this.activeForIntranet = activeForIntranet;
  }

  setActiveForBeamerPresentation(activeForBeamerPresentation: boolean) {
    this.activeForBeamerPresentation = activeForBeamerPresentation;
  }

  setOptions( options: any) {
    this.appComponents = options;
  }

  toJSON() {
    const appComponentsAsJson = [];
    if (this.appComponents) {
      this.appComponents.forEach( app => {
        appComponentsAsJson.push(app.toJSON());
      });
    }

    return {
      id: this.id,
      name: this.name,
      usedComponent: this.usedComponent ? this.usedComponent.componentName : '',
      appComponentId: this.appComponentId,
      appComponents: appComponentsAsJson,
      data: this.data,
      activeForIntranet: this.activeForIntranet,
      activeForBeamerPresentation: this.activeForBeamerPresentation,
      icon: this.icon,
      active: false
    };
  }
}
