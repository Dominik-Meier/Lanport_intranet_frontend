import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from '../../../interfaces/componentWithName.component';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SurveyService} from '../../../../services/dataServices/survey.service';
import {Survey} from '../../../../models/Survey';

@Component({
  selector: 'app-survey-configuration',
  templateUrl: './survey-configuration.component.html',
  styleUrls: ['./survey-configuration.component.scss']
})
export class SurveyConfigurationComponent extends ComponentWithNameComponent implements OnInit, OnDestroy {
  static componentName = 'SurveyComponent';
  private subscriptions: Subscription[] = [];
  surveys: Survey[] = this.surveyService.getLocalSurveys();
  selectedSurvey: Survey;
  selectedSurveyId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<SurveyConfigurationComponent>,
              private surveyService: SurveyService) { super(); }

  ngOnInit(): void {
    if (this.data.data && this.surveys) {
      this.selectedSurveyId = this.data.data;
      this.selectedSurvey = this.surveys.find(x => x.id.toString() === this.selectedSurveyId.toString());
    }
    this.subscriptions.push(this.surveyService.surveyObservable.subscribe(s => this.setData(s)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  setData(surveys: Survey[]) {
    this.surveys = surveys;
    if (this.data.data && this.surveys) {
      this.selectedSurveyId = this.data.data;
      this.selectedSurvey = this.surveys.find(x => x.id.toString() === this.selectedSurveyId.toString());
    }
  }

  public surveyComparator(option, value): boolean {
    return option.id.toString() === value.id.toString();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
