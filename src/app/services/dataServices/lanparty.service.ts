import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Lanparty} from '../../models/Lanparty';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {mapJSONToLanpartyArray} from '../../util/mapperFunctions';
import {EventEmitterService} from '../event-emitter.service';
import {lanpartiesDiffer} from '../../util/modelDiffers/lanpartyUpdater';

@Injectable({
  providedIn: 'root'
})
export class LanpartyService {
  constructor(private http: HttpClient, private eventEmitter: EventEmitterService) {
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
    /**
     * Be careful as this method builds on that the event at tournament service is executed fist
     */
    this.eventEmitter.lanpartyDeletedObservable.subscribe( l => this.removeLanpartyFromList(l));
    this.eventEmitter.lanpartiesUpdatedObservable.subscribe( l => this.updateLanparties(l));
  }

  /**
   * Local methodes to the frontend from here on!
   */

  getLanparties() {
    return this.lanparties;
  }

  updateLanparties(l: Lanparty[]) {
    lanpartiesDiffer(this.lanparties, l);
    this.lanparitesSubject.next(this.lanparties);
  }

  removeLanpartyFromList(lanparty: Lanparty) {
    const index = this.lanparties.findIndex( x => x.getId().toString() === lanparty.getId().toString());
    if (index  > -1) {
      this.lanparties.splice(index, 1);
    }
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

  createLanparty() {
    const targetURL = this.url + 'lanparties/';
    return this.http.post(targetURL, null);
  }

  deleteLanparty(lanparty: Lanparty) {
    const targetURL = this.url + 'lanparties/' + lanparty.id.toString();
    return this.http.delete(targetURL);
  }

  getLanpartiesBackend(): Observable<Lanparty[]> {
    const targetURL = this.url + 'lanparties';
    return this.http.get<Lanparty[]>(targetURL).pipe( map(
      response => mapJSONToLanpartyArray(response)
    ));
  }

  saveLanpartiesBackend(lanparties: Lanparty[]): Observable<Lanparty[]> {
    const targetURL = this.url + 'lanparties';
    return this.http.put<Lanparty[]>(targetURL, lanparties);
  }
}
