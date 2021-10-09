import {SurveyQuestionOption} from './SurveyQuestionOption';
import {SurveyQuestionUserAnswer} from './SurveyQuestionUserAnswer';

export class SurveyQuestion {
  id: number;
  question: string;
  surveyId: number;
  howManyAnswersAreAllowed: number;
  answerType: string;
  surveyQuestionOptions: SurveyQuestionOption[];
  surveyQuestionUserAnswers: SurveyQuestionUserAnswer[];

  constructor(id: number, question: string, surveyId: number, howManyAnswersAreAllowed: number, answerType: string,
              surveyQuestionOptions: SurveyQuestionOption[], surveyQuestionUserAnswers: SurveyQuestionUserAnswer[]) {
    this.id = id;
    this.question = question;
    this.surveyId = surveyId;
    this.howManyAnswersAreAllowed = howManyAnswersAreAllowed;
    this.answerType = answerType;
    this.surveyQuestionOptions = surveyQuestionOptions;
    this.surveyQuestionUserAnswers = surveyQuestionUserAnswers;
  }
}
