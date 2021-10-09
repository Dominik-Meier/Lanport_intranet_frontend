import {SurveyQuestion} from './SurveyQuestion';

export class Survey {
  id: number;
  name: string;
  lanpartyId: number;
  startDate: Date;
  endDate: Date;
  surveyQuestions: SurveyQuestion[];

  constructor(id: number, name: string, lanpartyId: number, startDate: Date, endDate: Date, surveyQuestions: SurveyQuestion[]) {
    this.id = id;
    this.name = name;
    this.lanpartyId = lanpartyId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.surveyQuestions = surveyQuestions;
  }
}
