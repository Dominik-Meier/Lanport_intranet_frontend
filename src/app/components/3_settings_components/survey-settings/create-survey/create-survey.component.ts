import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Survey} from '../../../../models/Survey';
import {SurveyQuestion} from "../../../../models/SurveyQuestion";
import {SurveyQuestionOption} from "../../../../models/SurveyQuestionOption";

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {
  survey: Survey;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CreateSurveyComponent>) { }

  ngOnInit(): void {
    this.survey = this.data.survey;
  }

  addSurveyQuestion() {
    this.survey.surveyQuestions.push(new SurveyQuestion(null, '', null, 1, 'boolean', [], []));
  }

  addSurveyQuestionOption(questionOption: SurveyQuestion) {
    questionOption.surveyQuestionOptions.push(new SurveyQuestionOption(null, '', null));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
