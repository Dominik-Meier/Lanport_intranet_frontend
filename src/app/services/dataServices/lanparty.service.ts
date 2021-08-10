import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Lanparty} from '../../models/Lanparty';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {mapJSONToLanartyArray} from '../../util/mapperFunctions';

@Injectable({
  providedIn: 'root'
})
export class LanpartyService{
  constructor(private http: HttpClient) {
    this.init();
  }

  url = environment.BASE_API_URL;
  lanparties: Lanparty[];
  activeLanparty: Lanparty;

  lanparitesSubject = new Subject<Lanparty[]>();
  getLanpartiesObservable = this.lanparitesSubject.asObservable();

  init(): void {
    this.getLanpartiesBackend().subscribe( res => {
      this.lanparties = res;
      this.lanparitesSubject.next(this.lanparties);
    });
  }

  /**
   * Local methodes to the frontend from here on!
   */

  getLanparties() {
    return this.lanparties;
  }

  saveLanparties(lanparties: Lanparty[]) {
    this.saveLanpartiesBackend(lanparties).subscribe( () => {
      this.getLanpartiesBackend().subscribe( res => {
        this.lanparties = res;
        this.lanparitesSubject.next(this.lanparties);
      });
    });
  }



  /**
   * Remote methodes to the backend from here on!
   */

  getLanpartiesBackend(): Observable<Lanparty[]> {
    const targetURL = this.url + 'lanparties';
    return this.http.get<Lanparty[]>(targetURL).pipe( map(
      response => mapJSONToLanartyArray(response)
    ));
  }

  saveLanpartiesBackend(lanparties: Lanparty[]): Observable<Lanparty[]> {
    const targetURL = this.url + 'lanparties';
    return this.http.put<Lanparty[]>(targetURL, lanparties);
  }

  // Not needed atm!
  // addLanparty(lanparty: Lanparty) {
  //   const targetURL = this.url + 'lanparties';
  //   return this.http.post(targetURL, lanparty).pipe(map( res => {
  //     return this.mapJSONToLanparty(res);
  //   }))
  // }

}
