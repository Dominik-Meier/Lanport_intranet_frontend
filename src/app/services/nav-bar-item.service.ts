import { Injectable } from '@angular/core';
import {NavBarItem} from "../models/NavBarItem";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class NavBarItemService {
  private navBarItemsSubject = new Subject<NavBarItem[]>();
  public navBarItemsObservable = this.navBarItemsSubject.asObservable();

  private navBarItems: NavBarItem[] = [];


  constructor() {
    //TODO test cases remove those later
    this.addNavBarItem( new NavBarItem('test1', ['test1-1', 'test1-2']));
    this.addNavBarItem( new NavBarItem('test2', ['test2-1', 'test2-2']));
    this.addNavBarItem( new NavBarItem('test3', ['test3-1', 'test3-2']));
  }

  getNavBarItems() {
    return this.navBarItems;
  }

  addNavBarItem(newNavBarItem: NavBarItem) {
    this.navBarItems.push(newNavBarItem);
  }

  setNewActiveItem(navItem: NavBarItem) {
    for( const item of this.navBarItems) {

      if (item.getActive()) {
        item.setActive(false);
      }

      if (item.getName() === navItem.getName()) {
        item.setActive(true);
      }
    }

    this.navBarItemsSubject.next(this.getNavBarItems());
  }
}
