import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lanparty} from "../../models/Lanparty";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

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
      console.log(res);
    })
  }

  private url = environment.BASE_API_URL;
  private lanparties: Lanparty[];
  private activeLanparty: Lanparty;

  getLanparties() {
    return this.lanparties;
  }

  //TODO map is not working correctly!
  getLanpartiesBackend(): Observable<Lanparty[]> {
    const targetURL = this.url + 'lanparties';
    return this.http.get<Lanparty[]>(targetURL).pipe( tap(
      data => this.mapJSONToLanartyArray(data),
      error => console.log(error)
    ));
  }

  mapJSONToLanartyArray(data: any): Lanparty[] {
    const result: Lanparty[] = [];
    data.forEach( lanparty => result.push(new Lanparty(lanparty.name, lanparty.active, lanparty.startDate, lanparty.endDate)));
    console.log(result);
    return result;
  }
}
