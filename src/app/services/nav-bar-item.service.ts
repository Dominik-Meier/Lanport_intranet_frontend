import { Injectable } from '@angular/core';
import {NavBarItem} from "../models/NavBarItem";
import {Subject} from "rxjs";
import {TournamentComponent} from "../components/tournament/tournament.component";

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


  constructor() {
    //TODO test cases remove those later
    this.addNavBarItem( new NavBarItem('Tournament', ['test1-1', 'test1-2'], TournamentComponent));
    this.addNavBarItem( new NavBarItem('test2', ['test2-1', 'test2-2']));
    this.addNavBarItem( new NavBarItem('test3', ['test3-1', 'test3-2']));
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
