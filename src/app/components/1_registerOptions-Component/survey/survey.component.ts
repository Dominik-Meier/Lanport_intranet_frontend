import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from '../../interfaces/componentWithName.component';
import {Subscription} from 'rxjs';
import {Survey} from '../../../models/Survey';
import {SurveyService} from '../../../services/dataServices/survey.service';
import {EventEmitterService} from '../../../services/event-emitter.service';
import {SurveyQuestion} from "../../../models/SurveyQuestion";
import {SurveyQuestionUserAnswer} from "../../../models/SurveyQuestionUserAnswer";

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent extends ComponentWithNameComponent implements OnInit, OnDestroy {
  static componentName = 'SurveyComponent';
  private subscriptions: Subscription[] = [];
  public survey: Survey;
  public answerArray: SurveyQuestionUserAnswer[] = [];
  private surveys: Survey[] = this.surveyService.getLocalSurveys();
  private surveyId: number;
  @Input() data: any;

  constructor(private surveyService: SurveyService,
              private eventEmitter: EventEmitterService) { super(); }

  ngOnInit(): void {
    this.surveyId = this.data.data;
    this.survey = this.surveys.find(x => x.id.toString() === this.surveyId.toString());
    this.setUpUserAnswerArray();
    this.subscriptions.push(this.surveyService.surveyObservable.subscribe(s => this.setData(s)));
  }

  setData(surveys: Survey[]) {
    this.surveys = surveys;
    this.survey = this.surveys.find(x => x.id.toString() === this.surveyId.toString());
    this.setUpUserAnswerArray();
  }

  setUpUserAnswerArray() {
    if (this.survey) {
      console.log(this.survey);
      this.survey.surveyQuestions.forEach( q => {
        if (q.answerType === 'string') {
          q.surveyQuestionUserAnswers.push(new SurveyQuestionUserAnswer(null, false, '', null, q.id, null));
        } else if (q.answerType === 'boolean') {
          q.surveyQuestionOptions.forEach( qO => {
            q.surveyQuestionUserAnswers.push(new SurveyQuestionUserAnswer(null, false, '', null, q.id, qO.id));
          });
        }
      });
    }
  }

  isDisabled(question: SurveyQuestion, answer: SurveyQuestionUserAnswer) {
    return question.surveyQuestionUserAnswers.filter( x => x.booleanAnswer === true).length
      >= question.howManyAnswersAreAllowed && answer.booleanAnswer === false;
  }

  optionSelected(event: any, answer: SurveyQuestionUserAnswer) {
    answer.booleanAnswer = event.checked;
  }

  getOptionName(answer: SurveyQuestionUserAnswer) {
    return this.survey.surveyQuestions.find(x => x.id.toString() === answer.surveyQuestionId.toString())
      .surveyQuestionOptions.find(y => y.id.toString() === answer.surveyQuestionOptionId.toString()).questionOption;
  }

  stringAnswer(question: SurveyQuestion, input: any) {
    if (question.surveyQuestionUserAnswers.length !== 1) {
      console.log('This should no be possible');
    } else {
      question.surveyQuestionUserAnswers[0].stringAnswer = input;
    }
  }

  sendSurveyAnswers() {
    console.log(this.answerArray);
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }
}
