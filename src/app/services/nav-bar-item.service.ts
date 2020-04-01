import { Injectable } from '@angular/core';
import {NavBarItem} from "../models/NavBarItem";
import {Subject} from "rxjs";
import {RegisterOptionItem} from "../models/registerOptionItem";
import {DynamicRegisterOptionsComponent} from "../components/0_navBar-Item-Component/dynamic-register-options/dynamic-register-options.component";
import {HtmlDisplayerComponent} from "../components/1_registerOptions-Component/html-displayer/html-displayer.component";
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

      if (item.getActive()) {
        item.setActive(false);
      }

      if (item.getName() === navItem.getName()) {
        item.setActive(true);
        this.activeNavBarItem = item;
      }
    }

    this.navBarItemsSubject.next(this.getNavBarItems());
    this.activeNavBarItemsSubject.next(this.getActiveNavBarItem());
  }

}
