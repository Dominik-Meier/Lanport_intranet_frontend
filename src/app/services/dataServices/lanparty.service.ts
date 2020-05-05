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



  getLanparties() {
    return this.lanparties;
  }

  //TODO map is not working correctly use map instead of tap => search example it is possible!
  getLanpartiesBackend(): Observable<Lanparty[]> {
    const targetURL = this.url + 'lanparties';
    return this.http.get<Lanparty[]>(targetURL).pipe( tap(
      data => this.mapJSONToLanartyArray(data),
      error => console.log(error)
    ));
  }

  addLanparty(lanparty: Lanparty) {
    const targetURL = this.url + 'lanparties';
    return this.http.post(targetURL, lanparty).pipe(map( res => {
      return this.mapJSONToLanparty(res);
    }))
  }

  mapJSONToLanartyArray(data: any): Lanparty[] {
    const result: Lanparty[] = [];
    data.forEach( lanparty => result.push(new Lanparty(lanparty.name, lanparty.active, lanparty.startDate, lanparty.endDate)));
    return result;
  }

  mapJSONToLanparty(data: any): Lanparty {
    return new Lanparty(data.name, data.active, data.startDate, data.endDate);
  }
}
