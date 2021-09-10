import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventEmitterService} from '../event-emitter.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {mapJSONToMenu, mapJSONToMenuArray} from '../../util/mapperFunctions';
import {Observable, Subject} from 'rxjs';
import {Menu} from '../../models/Menu';
import {MenuItem} from '../../models/MenuItem';
import {menuDiffer, menuItemDiffer} from '../../util/modelDiffers/menuUpdater';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url = environment.BASE_API_URL;
  menus: Menu[] = [];
  menusSubject = new Subject<Menu[]>();
  menusObservable = this.menusSubject.asObservable();

  constructor(private http: HttpClient, private eventEmitter: EventEmitterService) {
    this.getMenus().subscribe( m => {
      this.menus = m;
      this.menusSubject.next(this.menus);
    });
    this.eventEmitter.menuCreatedObservable.subscribe(m => this.localAddMenu(m));
    this.eventEmitter.menuUpdatedObservable.subscribe(m => this.localUpdateMenu(m));
    this.eventEmitter.menuDeletedObservable.subscribe(m => this.localDeleteMenu(m));
    this.eventEmitter.menuItemCreatedObservable.subscribe(mo => this.localAddMenuItem(mo));
    this.eventEmitter.menuItemUpdatedObservable.subscribe(mo => this.localUpdateMenuItem(mo));
    this.eventEmitter.menuItemDeletedObservable.subscribe(mo => this.localDeleteMenuItem(mo));
  }

  private localAddMenu(menu: Menu) {
    this.menus.push(menu);
    this.menusSubject.next(this.menus);
  }

  private localUpdateMenu(menu: Menu) {
    const oldMenu = this.menus.find(x => x.id.toString() === menu.id.toString());
    menuDiffer(oldMenu, menu);
    this.menusSubject.next(this.menus);
  }

  private localDeleteMenu(menu: Menu) {
    const index = this.menus.findIndex( x => x.id.toString() === menu.id.toString());
    if (index !== null) {
      this.menus.splice(index, 1);
    }
    this.menusSubject.next(this.menus);
  }

  private localAddMenuItem(menuItem: MenuItem) {
    const menu = this.menus.find(x => x.id.toString() === menuItem.menuId.toString());
    menu.menuItems.push(menuItem);
    this.menusSubject.next(this.menus);
  }

  private localUpdateMenuItem(menuItem: MenuItem) {
    const menu = this.menus.find(x => x.id === menuItem.menuId);
    const oldMenuItem = menu.menuItems.find(x => x.id.toString() === menuItem.id.toString());
    menuItemDiffer(oldMenuItem, menuItem);
    this.menusSubject.next(this.menus);
  }

  private localDeleteMenuItem(menuItem: MenuItem) {
    const menu = this.menus.find(x => x.id === menuItem.menuId);
    const index = menu.menuItems.findIndex(x => x.id.toString() === menuItem.id.toString());
    if (index !== null) {
      menu.menuItems.splice(index, 1);
    }
    this.menusSubject.next(this.menus);
  }

  getMenus(): Observable<Menu[]> {
    const targetURL = this.url + 'menu/';
    return this.http.get(targetURL).pipe(map( menus => mapJSONToMenuArray(menus)));
  }

  getMenu(id: number): Observable<Menu> {
    const targetURL = this.url + 'menu/' + id.toString();
    return this.http.get(targetURL).pipe(map( menu => mapJSONToMenu(menu)));
  }

  createMenu() {
    const targetURL = this.url + 'menu/';
    return this.http.post(targetURL, null);
  }

  updateMenu(menu) {
    const targetURL = this.url + 'menu/' + menu.id.toString();
    return this.http.put(targetURL, menu);
  }

  deleteMenu(id) {
    const targetURL = this.url + 'menu/' + id.toString();
    return this.http.delete(targetURL);
  }

  createMenuItem(menuId, mealId) {
    const targetURL = this.url + 'menu/' + menuId.toString() + '/item';
    return this.http.post(targetURL, {mealId});
  }

  updateMenuItem(menuItem) {
    const targetURL = this.url + 'menu/item/' + menuItem.id.toString();
    return this.http.put(targetURL, menuItem);
  }

  deleteMenuItem(id) {
    const targetURL = this.url + 'menu/item/' + id.toString();
    return this.http.delete(targetURL);
  }
}
