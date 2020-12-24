import { Injectable } from '@angular/core';
import {NavBarItem} from "../models/NavBarItem";
import {Subject} from "rxjs";
import {AppConfigService} from "./app-config.service";

@Injectable({
  providedIn: 'root'
})

export class NavBarItemService {
  // Any updates on NavbarItemsList are notified over this subject
  private navBarItemsSubject = new Subject<NavBarItem[]>();
  public navBarItemsObservable = this.navBarItemsSubject.asObservable();
  private navBarItems: NavBarItem[] = [];

  private activeNavBarItemsSubject = new Subject<NavBarItem>();
  public activeNavBarItemsObservable = this.activeNavBarItemsSubject.asObservable();
  private activeNavBarItem: NavBarItem;


  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.configObservable.subscribe( newConfig => {
      this.navBarItems = newConfig;
      this.navBarItemsSubject.next(this.getNavBarItems());
    })
  }

  applyNewNavBar(newConfig: NavBarItem[]) {
    this.appConfigService.createAppConfig(this.navBarItems).subscribe( newNavBarItems => {
      console.log(newNavBarItems);
      this.navBarItems = newConfig;
      this.navBarItemsSubject.next(this.getNavBarItems());
      console.log('NavBarItem Service set new config');
    });
  }

  applyNewNavBarItem(newItem: NavBarItem, oldItem: NavBarItem) {
    const indexOldItem = this.navBarItems.indexOf(oldItem);
    const copyOfNavBarItems = this.navBarItems;
    copyOfNavBarItems[indexOldItem].setOptions(newItem.getOptions());
    this.appConfigService.createAppConfig(copyOfNavBarItems).subscribe( newNavBarItems => {
      console.log(newNavBarItems);
      this.navBarItems = copyOfNavBarItems;
      this.navBarItemsSubject.next(this.getNavBarItems());
      console.log('NavBarItem Service set new config for Item: ', newItem.getName());
    })
  }

  getNavBarItems() {
    return this.navBarItems;
  }

  getActiveNavBarItem() {
    return this.activeNavBarItem;
  }

  addNavBarItem(newNavBarItem: NavBarItem) {
    this.navBarItems.push(newNavBarItem);
    this.navBarItemsSubject.next(this.getNavBarItems());
  }

  setNewActiveItem(navItem: NavBarItem) {
    for( const item of this.navBarItems) {

      if (item.getActive() && item.getName() != navItem.getName()) {
        item.setActive(false);
      }

      if (item.getName() === navItem.getName()) {
        item.setActive(navItem.getActive());
        if (item.getActive()) {
          this.activeNavBarItem = item;
        } else {
          this.activeNavBarItem = null;
        }
      }
    }

    this.navBarItemsSubject.next(this.getNavBarItems());
    this.activeNavBarItemsSubject.next(this.getActiveNavBarItem());
  }

}
