import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NavBarItem} from "../models/NavBarItem";
import {map, tap} from "rxjs/operators";
import {RegisterOptionItem} from "../models/registerOptionItem";
import {Observable, Subject} from "rxjs";
import {navBarComponentSelectorMap, navBarItemComponentSelectorMap} from "../models/maps/componentSelectorMaps";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  constructor(private http: HttpClient) {
    this.init();
  }

  init(): void {
    this.getAppConfig().subscribe( res => {
      this.config = res;
      this.updateConfigOnApp();
    });
  }

  private configSubject = new Subject<NavBarItem[]>();
  public configObservable = this.configSubject.asObservable();
  private config: NavBarItem[];
  private url = environment.BASE_API_URL;

  updateConfigOnApp() {
    this.configSubject.next(this.config);
  }

  getConfig() {
    return this.config;
  }

  createAppConfig(data: NavBarItem[]) {
    const targetURL = this.url + 'settings/angularAppConfig';
    const jsonData = [];
    data.forEach( item => jsonData.push(item.toJSON()));

    return this.http.post(targetURL, {'data': jsonData});
  }

  getAppConfig(): Observable<NavBarItem[]> {
    const targetURL = this.url + 'settings/angularAppConfig';
    return this.http.get(targetURL).pipe( map(
      data => {
        return this.mapJSONToAppSettingsArray(data);
      },
      error => console.log(error)
    ));
  }

  mapJSONToAppSettingsArray(data: any): NavBarItem[]  {
    const resultArr: NavBarItem[] = [];
    for ( const element of data.data) {
      let componentOuter = null;
      if(navBarComponentSelectorMap.has(element.component)) {
        componentOuter = navBarComponentSelectorMap.get(element.component);
      }

      const optionsArr = []
      for (const option of element.options) {
        let componentInner = null;
        if(navBarItemComponentSelectorMap.has(option.component)) {
          componentInner = navBarItemComponentSelectorMap.get(option.component);
        }
        optionsArr.push(new RegisterOptionItem(option.name, option.data, componentInner))
      }
      resultArr.push( new NavBarItem(element.name, optionsArr, componentOuter))
    }
    return resultArr;
  }
}
