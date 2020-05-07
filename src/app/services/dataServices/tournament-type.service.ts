import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {TournamentType} from "../../models/TournamentType";

@Injectable({
  providedIn: 'root'
})
export class TournamentTypeService {
  constructor(private http: HttpClient) {
    this.init();
  }

  init(): void {
    this.getTournamentTypesBackend().subscribe( res => {
      this.tournamentTypes = res;
      this.tournamentTypesSubject.next(this.tournamentTypes);
    })
  }

  private url = environment.BASE_API_URL;
  private tournamentTypes: TournamentType[];

  private tournamentTypesSubject = new Subject<TournamentType[]>();
  public getTournamentTypeObservable = this.tournamentTypesSubject.asObservable();

  /**
   * Local methodes to the frontend from here on!
   */

  getTournamentTypes() {
    return this.tournamentTypes;
  }

  saveTournamentTypes(tournamentTypes: TournamentType[]) {
    this.saveTournamentTypesBackend(tournamentTypes).subscribe( () => {
      this.getTournamentTypesBackend().subscribe( newSavedTournamentTypes => {
        console.log(newSavedTournamentTypes);
        this.tournamentTypes = newSavedTournamentTypes;
        this.tournamentTypesSubject.next(newSavedTournamentTypes);
      });
    })
  }


  /**
   * Remote methodes to the backend from here on!
   */

  getTournamentTypesBackend(): Observable<TournamentType[]> {
    const targetURL = this.url + 'tournamentTypes';
    return this.http.get<TournamentType[]>(targetURL).pipe( map(
      response => { return this.mapJSONToTournamentTypeArray(response); }
    ));
  }

  saveTournamentTypesBackend(tournamentTypes: TournamentType[]): Observable<TournamentType[]> {
    const targetURL = this.url + 'tournamentTypes';
    return this.http.put<TournamentType[]>(targetURL, tournamentTypes);
  }

  mapJSONToTournamentTypeArray(data: any): TournamentType[] {
    const result: TournamentType[] = [];
    data.forEach( tournamentType => result.push(new TournamentType(tournamentType.id, tournamentType.name)));
    return result;
  }
}
