import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {TournamentType} from '../../models/TournamentType';
import {mapJSONToTournamentTypeArray} from '../../util/mapperFunctions';

@Injectable({
  providedIn: 'root'
})
export class TournamentTypeService {
  constructor(private http: HttpClient) {
    this.init();
  }

  url = environment.BASE_API_URL;
  tournamentTypes: TournamentType[];

  tournamentTypesSubject = new Subject<TournamentType[]>();
  getTournamentTypeObservable = this.tournamentTypesSubject.asObservable();

  init(): void {
    this.getTournamentTypesBackend().subscribe( res => {
      this.tournamentTypes = res;
      this.tournamentTypesSubject.next(this.tournamentTypes);
    });
  }

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
    });
  }


  /**
   * Remote methodes to the backend from here on!
   */

  getTournamentTypesBackend(): Observable<TournamentType[]> {
    const targetURL = this.url + 'tournamentTypes';
    return this.http.get<TournamentType[]>(targetURL).pipe( map(
      response => mapJSONToTournamentTypeArray(response)
    ));
  }

  saveTournamentTypesBackend(tournamentTypes: TournamentType[]): Observable<TournamentType[]> {
    const targetURL = this.url + 'tournamentTypes';
    return this.http.put<TournamentType[]>(targetURL, tournamentTypes);
  }
}
