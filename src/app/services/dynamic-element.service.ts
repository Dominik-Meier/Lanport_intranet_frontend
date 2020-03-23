import { Injectable, ViewContainerRef } from '@angular/core';
import SelectableComponent from '../util/selectableComponent';

@Injectable({
  providedIn: 'root',
})
export class DynamicElementService {

  dynamicElementInsertionPoint: ViewContainerRef;
  private selectedComponent: SelectableComponent;

  constructor() { }

  public setInsertionPoint(insertionPoint: ViewContainerRef) {
    this.dynamicElementInsertionPoint = insertionPoint;
  }

  public select(component: SelectableComponent): void {
    if (this.selectedComponent !== undefined) {
      this.selectedComponent.unselectComponent();
    }
    this.selectedComponent = component;
    component.selectComponent();
  }

  public clearInsertionPoint() {
    this.selectedComponent = undefined;
    this.dynamicElementInsertionPoint.clear();
  }

  public getInsertionPoint(): ViewContainerRef {
    return this.dynamicElementInsertionPoint;
  }
}

