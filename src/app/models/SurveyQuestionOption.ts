export class SurveyQuestionOption {
  id: number;
  questionOption: string;
  surveyQuestionId: number;

  constructor(id: number, questionOption: string, surveyQuestionId: number) {
    this.id = id;
    this.questionOption = questionOption;
    this.surveyQuestionId = surveyQuestionId;
  }
}
