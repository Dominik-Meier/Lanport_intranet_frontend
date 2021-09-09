import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {EventEmitterService} from '../event-emitter.service';
import {map} from 'rxjs/operators';
import {Feedback} from '../../models/Feedback';
import {mapJSONToFeedback, mapJSONToFeedbackArray} from '../../util/mapperFunctions';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private url = environment.BASE_API_URL;

  constructor(private http: HttpClient, private eventEmitter: EventEmitterService) { }

  getFeedbackById(id: number) {
    const targetURL = this.url + 'feedback/' + id.toString();
    return this.http.get(targetURL).pipe(map( feedback => mapJSONToFeedback(feedback)));
  }

  getFeedback() {
    const targetURL = this.url + 'feedback/';
    return this.http.get(targetURL).pipe(map( feedback => mapJSONToFeedbackArray(feedback)));
  }

  createFeedback(feedback: Feedback) {
    const targetURL = this.url + 'feedback/';
    return this.http.post(targetURL, feedback);
  }

  updateFeedback(feedback: Feedback) {
    const targetURL = this.url + 'feedback/';
    return this.http.put(targetURL, feedback);
  }

  deleteFeedback(id: number) {
    const targetURL = this.url + 'feedback/' + id.toString();
    return this.http.delete(targetURL);
  }
}
