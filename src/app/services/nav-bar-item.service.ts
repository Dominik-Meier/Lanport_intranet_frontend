import { Injectable } from '@angular/core';
import {NavBarItem} from '../models/NavBarItem';
import {Subject} from 'rxjs';
import {AppConfigService} from './app-config.service';

@Injectable({
  providedIn: 'root'
})

export class NavBarItemService {
  private activeNavBarItemsSubject = new Subject<NavBarItem>();
  public activeNavBarItemsObservable = this.activeNavBarItemsSubject.asObservable();
  private activeNavBarItem: NavBarItem;
  private navBarItems: NavBarItem[] = [];

  constructor(private appConfigService: AppConfigService) {
    this.appConfigService.configObservable.subscribe( newConfig => {
      this.navBarItems = newConfig;
    });
  }

  getActiveNavBarItem() {
    return this.activeNavBarItem;
  }

  setNewActiveItem(navItem: NavBarItem) {
    for ( const item of this.navBarItems) {

      if (item.getActive() && item.getName() !== navItem.getName()) {
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

    this.activeNavBarItemsSubject.next(this.getActiveNavBarItem());
  }

}
