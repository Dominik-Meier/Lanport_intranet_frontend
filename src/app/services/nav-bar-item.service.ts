import { Injectable } from '@angular/core';
import {NavBarItem} from "../models/NavBarItem";
import {Subject} from "rxjs";
import {TournamentComponent} from "../components/tournament/tournament.component";
import {InfoComponent} from "../components/info/info.component";
import {RegisterOptionItem} from "../models/registerOptionItem";

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
    this.addNavBarItem( new NavBarItem('Infos', [
      new RegisterOptionItem('Allgemein'),
      new RegisterOptionItem('Essenszeiten'),
      new RegisterOptionItem('Preise')], InfoComponent));
    this.addNavBarItem( new NavBarItem('Tournament', [
      new RegisterOptionItem('Infos'),
      new RegisterOptionItem('Tournaments'),
      new RegisterOptionItem('Anmeldung'),
      new RegisterOptionItem('Preise')], TournamentComponent));
    this.addNavBarItem( new NavBarItem('Custom Tournaments', [
      new RegisterOptionItem('Infos'),
      new RegisterOptionItem('Tournaments'),
      new RegisterOptionItem('Anmeldung'),
      new RegisterOptionItem('Preise')]));
    this.addNavBarItem( new NavBarItem('Sponsoren', [new RegisterOptionItem('Sponsoren')]));
    this.addNavBarItem( new NavBarItem('Slideshow', [new RegisterOptionItem('Slides'), new RegisterOptionItem('Do it!')]));
    this.addNavBarItem( new NavBarItem('Feedback', [new RegisterOptionItem('Give it to me!')]));
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
