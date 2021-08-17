import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {NavBarItem} from '../models/NavBarItem';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {mapJSONToAppSettingsArray} from '../util/mapperFunctions';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private configSubject = new Subject<NavBarItem[]>();
  public configObservable = this.configSubject.asObservable();
  private config: NavBarItem[];
  private url = environment.BASE_API_URL;

  constructor(private http: HttpClient) {
    this.getAppConfig().subscribe( res => {
      this.config = res;
      this.configSubject.next(this.config);
    });
  }

  getConfig() {
    return this.config;
  }

  createAppConfig(data: NavBarItem[]) {
    const targetURL = this.url + 'settings/angularAppConfig';
    const jsonData = [];
    data.forEach( item => jsonData.push(item.toJSON()));

    return this.http.post(targetURL, {data: jsonData}).pipe(map(result => mapJSONToAppSettingsArray(result)));
  }

  getAppConfig(): Observable<NavBarItem[]> {
    const targetURL = this.url + 'settings/angularAppConfig';
    return this.http.get(targetURL).pipe(map(data => mapJSONToAppSettingsArray(data)));
  }

  deleteAppComponent(item: NavBarItem) {
    const targetURL = this.url + 'settings/angularAppConfig/appComponent/' + item.id;
    return this.http.delete(targetURL);
  }

  deleteAppRegisterComponent(item: NavBarItem) {
    const targetURL = this.url + 'settings/angularAppConfig/appRegisterComponent/' + item.id;
    return this.http.delete(targetURL);
  }
}
