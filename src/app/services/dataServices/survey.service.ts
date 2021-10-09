import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth-service.service';
import {Survey} from '../../models/Survey';
import {map} from 'rxjs/operators';
import {mapJSONToSurveyArray} from '../../util/mapperFunctions';
import {Subject} from 'rxjs';
import {EventEmitterService} from '../event-emitter.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private url = environment.BASE_API_URL;

  private surveys: Survey[] = [];
  private surveySubject = new Subject<Survey[]>();
  public surveyObservable = this.surveySubject.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService,
              private eventEmitter: EventEmitterService) {
    this.init();
  }

  init() {
    this.loadAllSurveys().subscribe(s => {
      this.surveys = s;
      this.surveySubject.next(this.surveys);
    });
    this.eventEmitter.surveyCreatedObservable.subscribe(s => this.surveyCreated(s));
    this.eventEmitter.surveyUpdatedObservable.subscribe(s => this.surveyUpdated(s));
    this.eventEmitter.surveyCreatedObservable.subscribe(s => this.surveyDeleted(s));
  }

  surveyCreated(survey: Survey) {
    this.surveys.push(survey);
    this.surveySubject.next(this.surveys);
  }

  surveyUpdated(survey: Survey) {
    // TODO
    console.log('Not implemented');
  }

  surveyDeleted(survey: Survey) {
    const index = this.surveys.findIndex( x => x.id.toString() === survey.id.toString());
    if (index !== null) {
      this.surveys.splice(index, 1);
    }
  }

  getLocalSurveys() {
    return this.surveys;
  }

  createSurvey(survey: Survey) {
    const targetURL = this.url + 'survey/';
    return this.http.post(targetURL, survey);
  }

  loadAllSurveys() {
    const targetURL = this.url + 'survey/';
    return this.http.get(targetURL).pipe( map(
      res => mapJSONToSurveyArray(res)));
  }

  deleteSurvey(id) {
    const targetURL = this.url + 'survey/' + id;
    return this.http.delete(targetURL);
  }
}
