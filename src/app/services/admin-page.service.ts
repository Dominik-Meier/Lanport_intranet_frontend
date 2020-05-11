import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {NavBarItemSettings} from "../models/NavBarItemSettings";
import {SetAppNavigationComponent} from "../components/3_settings_components/set-app-navigation/set-app-navigation.component";
import {LanpartySettingsComponent} from "../components/3_settings_components/lanparty-settings/lanparty-settings.component";
import {GamemodeSettingsComponent} from "../components/3_settings_components/gamemode-settings/gamemode-settings.component";
import {TournamentTypeSettingsComponent} from "../components/3_settings_components/tournament-type-settings/tournament-type-settings.component";
import {TournamentSettingsComponent} from "../components/3_settings_components/tournament-settings/tournament-settings.component";

@Injectable({
  providedIn: 'root'
})
export class AdminPageService {
  // Any updates on NavbarItemsList are notified over this subject
  private navBarItemsSubject = new Subject<NavBarItemSettings[]>();
  public navBarItemsObservable = this.navBarItemsSubject.asObservable();
  private navBarItems: NavBarItemSettings[] = [];

  private activeNavBarItemsSubject = new Subject<NavBarItemSettings>();
  public activeNavBarItemsObservable = this.activeNavBarItemsSubject.asObservable();
  private activeNavBarItem: NavBarItemSettings;


  constructor() {
    //This is the navigation tree ob the settings!
    this.addNavBarItem( new NavBarItemSettings('App Navigation', [], SetAppNavigationComponent));
    this.addNavBarItem( new NavBarItemSettings('Lanparty', [], LanpartySettingsComponent));
    this.addNavBarItem( new NavBarItemSettings('Game Mode', [], GamemodeSettingsComponent));
    this.addNavBarItem( new NavBarItemSettings('Tournament Type', [], TournamentTypeSettingsComponent));
    this.addNavBarItem( new NavBarItemSettings('Tournament', [], TournamentSettingsComponent));
  }

  getNavBarItems() {
    return this.navBarItems;
  }

  getActiveNavBarItem() {
    return this.activeNavBarItem;
  }

  addNavBarItem(newNavBarItem: NavBarItemSettings) {
    this.navBarItems.push(newNavBarItem);
    this.navBarItemsSubject.next(this.getNavBarItems());
  }

  setNewActiveItem(navItem: NavBarItemSettings) {
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
