import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {NavBarItem} from '../models/NavBarItem';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {mapJSONToAppSettingsArray} from '../util/mapperFunctions';
import {EventEmitterService} from './event-emitter.service';
import {configDiffer} from '../util/modelDiffers/configUpdaterHandlerFunctions';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private configSubject = new Subject<NavBarItem[]>();
  public configObservable = this.configSubject.asObservable();
  private config: NavBarItem[];
  private url = environment.BASE_API_URL;

  constructor(private http: HttpClient, private eventEmitter: EventEmitterService) {
    this.eventEmitter.appConfigChangedObservable.subscribe( aC => this.updateConfigLocal(aC));
    this.getAppConfig().subscribe( res => {
      this.config = res;
      this.configSubject.next(this.config);
    });
  }

  getConfig() {
    return this.config;
  }

  updateConfigLocal(newAppConfig: NavBarItem[]) {
    configDiffer(this.config, newAppConfig);
    this.configSubject.next(this.config);
  }

  createAppConfig(data: NavBarItem[]) {
    const targetURL = this.url + 'settings/angularAppConfig';
    const jsonData = [];
    data.forEach( item => jsonData.push(item.toJSON()));

    return this.http.post(targetURL, {data: jsonData});
  }

  getAppConfig(): Observable<NavBarItem[]> {
    const targetURL = this.url + 'settings/angularAppConfig';
    return this.http.get(targetURL).pipe(map(data => {
      return mapJSONToAppSettingsArray(data);
    }));
  }

  deleteAppComponent(item: NavBarItem) {
    const targetURL = this.url + 'settings/angularAppConfig/appComponent/' + item.id;
    return this.http.delete(targetURL);
  }

  addAppComponent(item: NavBarItem) {
    const targetURL = this.url + 'settings/angularAppConfig/appComponent';
    return this.http.post(targetURL, {data: item.toJSON()});
  }
}
