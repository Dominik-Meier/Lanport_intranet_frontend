export class SurveyQuestionUserAnswer {
  id: number;
  booleanAnswer: boolean;
  stringAnswer: string;
  userId: number;
  surveyQuestionId: number;
  surveyQuestionOptionId: number;

  constructor(id: number, booleanAnswer: boolean, stringAnswer: string, userId: number, surveyQuestionId: number,
              surveyQuestionOptionId: number) {
    this.id = id;
    this.booleanAnswer = booleanAnswer;
    this.stringAnswer = stringAnswer;
    this.userId = userId;
    this.surveyQuestionId = surveyQuestionId;
    this.surveyQuestionOptionId = surveyQuestionOptionId;
  }
}
