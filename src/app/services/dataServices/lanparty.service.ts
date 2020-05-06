import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lanparty} from "../../models/Lanparty";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LanpartyService{
  constructor(private http: HttpClient) {
    this.init();
  }

  init(): void {
    this.getLanpartiesBackend().subscribe( res => {
      this.lanparties = res;
      this.lanparitesSubject.next(this.lanparties);
    })
  }

  private url = environment.BASE_API_URL;
  private lanparties: Lanparty[];
  private activeLanparty: Lanparty;

  private lanparitesSubject = new Subject<Lanparty[]>();
  public getLanpartiesObservable = this.lanparitesSubject.asObservable();

  /**
   * Local methodes to the frontend from here on!
   */

  getLanparties() {
    return this.lanparties;
  }

  saveLanparties(lanparties: Lanparty[]) {
    this.saveLanpartiesBackend(lanparties).subscribe( res => console.log(res))
  }



  /**
   * Remote methodes to the backend from here on!
   */

  getLanpartiesBackend(): Observable<Lanparty[]> {
    const targetURL = this.url + 'lanparties';
    return this.http.get<Lanparty[]>(targetURL).pipe( map(
      response => { return this.mapJSONToLanartyArray(response); }
    ));
  }

  saveLanpartiesBackend(lanparties: Lanparty[]): Observable<Lanparty[]> {
    const targetURL = this.url + 'lanparties';
    return this.http.put<Lanparty[]>(targetURL, lanparties).pipe(map(
      response => { return this.mapJSONToLanartyArray(response); }
    ));
  }

  // Not needed atm!
  // addLanparty(lanparty: Lanparty) {
  //   const targetURL = this.url + 'lanparties';
  //   return this.http.post(targetURL, lanparty).pipe(map( res => {
  //     return this.mapJSONToLanparty(res);
  //   }))
  // }

  mapJSONToLanartyArray(data: any): Lanparty[] {
    const result: Lanparty[] = [];
    data.forEach( lanparty => result.push(new Lanparty(lanparty.id, lanparty.name, lanparty.active, lanparty.startDate, lanparty.endDate)));
    return result;
  }

  mapJSONToLanparty(data: any): Lanparty {
    return new Lanparty(data.id, data.name, data.active, data.startDate, data.endDate);
  }

}
