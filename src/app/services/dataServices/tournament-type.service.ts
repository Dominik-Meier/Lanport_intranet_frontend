import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {TournamentType} from '../../models/TournamentType';
import {mapJSONToTournamentTypeArray} from '../../util/mapperFunctions';
import {EventEmitterService} from '../event-emitter.service';
import {tournamentTypesDiffer} from '../../util/modelDiffers/tournamentTypeUpdater';

@Injectable({
  providedIn: 'root'
})

export class TournamentTypeService {
  constructor(private http: HttpClient,
              private eventEmitter: EventEmitterService) {
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
    this.eventEmitter.tournamentTypeDeletedObservable.subscribe( t => this.removeTournamentTypeFromList(t));
    this.eventEmitter.tournamentTypesUpdatedObservable.subscribe( t => this.updateTournamentType(t));
  }

  /**
   * Local methodes to the frontend from here on!
   */

  getTournamentTypes() {
    return this.tournamentTypes;
  }

  updateTournamentType(tournamentType: TournamentType[]) {
    tournamentTypesDiffer(this.tournamentTypes, tournamentType);
  }

  saveTournamentTypes(tournamentTypes: TournamentType[]) {
    this.saveTournamentTypesBackend(tournamentTypes).subscribe( () => {
      this.getTournamentTypesBackend().subscribe( newSavedTournamentTypes => {
        this.tournamentTypes = newSavedTournamentTypes;
        this.tournamentTypesSubject.next(newSavedTournamentTypes);
      });
    });
  }

  removeTournamentTypeFromList(tournamentTypeToDelete: TournamentType) {
    const index = this.tournamentTypes.findIndex( x => x.getId().toString() === tournamentTypeToDelete.getId().toString());
    if (index > -1) {
      this.tournamentTypes.splice(index, 1);
    }
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

  createTournamentType() {
    const targetURL = this.url + 'tournamentTypes';
    return this.http.post<TournamentType[]>(targetURL, null);
  }

  saveTournamentTypesBackend(tournamentTypes: TournamentType[]): Observable<TournamentType[]> {
    const targetURL = this.url + 'tournamentTypes';
    return this.http.put<TournamentType[]>(targetURL, tournamentTypes);
  }

  deleteTournamentType(id: number) {
    const targetURL = this.url + 'tournamentTypes/' + id.toString();
    return this.http.delete(targetURL);
  }
}
