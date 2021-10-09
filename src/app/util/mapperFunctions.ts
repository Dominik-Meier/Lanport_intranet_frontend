import {TournamentParticipant} from '../models/TournamentParticipant';
import {User} from '../models/User';
import {TeamMember} from '../models/TeamMember';
import {Team} from '../models/Team';
import {GameMode} from '../models/GameMode';
import {Lanparty} from '../models/Lanparty';
import {Tournament} from '../models/Tournament';
import {TournamentType} from '../models/TournamentType';
import {NavBarItem} from '../models/NavBarItem';
import {ComponentWithNameComponent} from '../components/interfaces/componentWithName.component';
import {HtmlDisplayerComponent} from '../components/1_registerOptions-Component/html-displayer/html-displayer.component';
import {TournamentComponent} from '../components/1_registerOptions-Component/tournament/tournament.component';
import {HtmlDisplayerConfigurationComponent} from '../components/1_registerOptions-Component/html-displayer/html-displayer-configuration/html-displayer-configuration.component';
import {TournamentConfigurationComponent} from '../components/1_registerOptions-Component/tournament/tournament-configuration/tournament-configuration.component';
import {HrefComponent} from '../components/1_registerOptions-Component/href-component/href.component';
import {HrefConfigurationComponent} from '../components/1_registerOptions-Component/href-component/href-configuration/href-configuration.component';
import {Feedback} from '../models/Feedback';
import {FeedbackComponent} from '../components/1_registerOptions-Component/feedback/feedback.component';
import {FeedbackConfigurationComponent} from '../components/1_registerOptions-Component/feedback/feedback-configuration/feedback-configuration.component';
import {Survey} from '../models/Survey';
import {SurveyQuestion} from '../models/SurveyQuestion';
import {SurveyQuestionOption} from '../models/SurveyQuestionOption';
import {SurveyQuestionUserAnswer} from '../models/SurveyQuestionUserAnswer';
import {SurveyComponent} from '../components/1_registerOptions-Component/survey/survey.component';
import {SurveyConfigurationComponent} from '../components/1_registerOptions-Component/survey/survey-configuration/survey-configuration.component';


export const navBarComponentSelectorMap: Map<string, ComponentWithNameComponent> = new Map<string, any>();
navBarComponentSelectorMap.set('HtmlDisplayerComponent', HtmlDisplayerComponent);
navBarComponentSelectorMap.set('TournamentComponent', TournamentComponent);
navBarComponentSelectorMap.set('HrefComponent', HrefComponent);
navBarComponentSelectorMap.set('FeedbackComponent', FeedbackComponent);
navBarComponentSelectorMap.set('SurveyComponent', SurveyComponent);

export const navBarItemComponentConfigurationSelectorMap: Map<string, ComponentWithNameComponent> = new Map<string, any>();
navBarItemComponentConfigurationSelectorMap.set('HtmlDisplayerComponent', HtmlDisplayerConfigurationComponent);
navBarItemComponentConfigurationSelectorMap.set('TournamentComponent', TournamentConfigurationComponent);
navBarItemComponentConfigurationSelectorMap.set('HrefComponent', HrefConfigurationComponent);
navBarItemComponentConfigurationSelectorMap.set('FeedbackComponent', FeedbackConfigurationComponent);
navBarItemComponentConfigurationSelectorMap.set('SurveyComponent', SurveyConfigurationComponent);


export function mapJSONToTournamentParticipant(data: any): TournamentParticipant {
  return new TournamentParticipant(data.id, data.tournamentId, mapJsonToUser(data.user));
}


export function mapJSONToTournamentParticipantArray(data: any): TournamentParticipant[] {
  const tournamentParticipant: TournamentParticipant[] = [];
  if (data) {
    for (const tm of data) {
      tournamentParticipant.push(mapJSONToTournamentParticipant(tm));
    }
  }
  return tournamentParticipant;
}

export function mapJsonToUser(data: any): User {
  return new User(data.id, data.nickname, data.registered, data.payed, data.seat, data.level);
}


export function mapJSONToTeam(data: any): Team {
  return new Team(data.id, data.name, data.pin, mapJSONToTournament(data.tournament),
    mapJSONToTeamMemberArray(data.teamMembers));
}

export function mapJSONToTeamMemberArray(data: any): TeamMember[] {
  const teamMembers: TeamMember[] = [];
  if (data) {
    for ( const tm of data) {
      teamMembers.push(mapJSONToTeamMember(tm));
    }
  }
  return teamMembers;
}

export function mapJSONToTeamMember(data: any): TeamMember {
  return new TeamMember(data.id, data.teamId, mapJsonToUser(data.user));
}

export function mapJSONToTeamArray(data: any): Team[] {
  const teams: Team[] = [];
  if (data) {
    for (const team of data) {
      teams.push(mapJSONToTeam(team));
    }
  }
  return teams;
}

export function mapJSONToGameModeArray(data: any): GameMode[] {
  const result: GameMode[] = [];
  data.forEach( gamemode => result.push(mapJSONToGameMode(gamemode)));
  return result;
}

export function mapJSONToGameMode(gamemode: any): GameMode {
  return new GameMode(gamemode.id, gamemode.name, gamemode.game, gamemode.elimination,
    gamemode.teamSize, gamemode.rules);
}

export function mapJSONToLanpartyArray(data: any): Lanparty[] {
  const result: Lanparty[] = [];
  data.forEach( lanparty => result.push(new Lanparty(lanparty.id, lanparty.name, lanparty.active,
    lanparty.startDate, lanparty.endDate)));
  return result;
}

export function mapJSONToLanparty(data: any): Lanparty {
  return new Lanparty(data.id, data.name, data.active, data.startDate, data.endDate);
}

export function mapJSONToTournamentArray(data: any): Tournament[] {
  const result: Tournament[] = [];
  data.forEach(t => result.push(mapJSONToTournament(t)));
  return result;
}

export function mapJSONToTournament(t: any): Tournament {
  if (t === null) {
    return null;
  }
  return new Tournament(t.id, t.name, t.lanparty,
    new GameMode(t.gamemode?.id, t.gamemode?.name, t.gamemode?.game, t.gamemode?.elimination, t.gamemode?.teamSize, t.gamemode?.rules),
    new TournamentType(t.tournamentType?.id, t.tournamentType?.name),
    t.teamRegistration, t.numberOfParticipants, t.published, t.started, t.startDate, t.endDate, t.registrationEndDate,
    t.finished, t.awards, t.challongeParticipantsAdded, t.challongeTournamentStarted);
}

export function mapJSONToTournamentTypeArray(data: any): TournamentType[] {
  const result: TournamentType[] = [];
  data.forEach( tournamentType => result.push(mapJSONToTournamentType(tournamentType)));
  return result;
}

export function mapJSONToTournamentType(tournamentType: any): TournamentType {
  return new TournamentType(tournamentType.id, tournamentType.name);
}

export function mapJSONToAppSettingsArray(data: any): NavBarItem[]  {
  const resultArr: NavBarItem[] = [];
  for ( const element of data) {
    let appComponents = [];
    let componentOuter = null;
    if (navBarComponentSelectorMap.has(element.usedComponent)) {
      componentOuter = navBarComponentSelectorMap.get(element.usedComponent);
    }

    if (element?.appComponents && element.appComponents?.length > 0) {
      appComponents = mapJSONToAppSettingsArray(element.appComponents);
    }

    resultArr.push( new NavBarItem(element.id, element.name, element.usedComponent, element.appComponentId, appComponents,
      element.data, element.activeForIntranet, element.activeForBeamerPresentation, element.icon, false, element.beamerTimer,
      element.order));
  }
  return resultArr;
}

export function mapJSONToFeedback(data: any): Feedback {
  const user = mapJsonToUser(data.user);
  return new Feedback(data.id, data.wasGood, data.wasBad, data.suggestions, data.isPublic, data.isAnonymous,
    data.userId, user, data.lanpartyId);
}

export function mapJSONToFeedbackArray(data: any): Feedback[] {
  const resultArr: Feedback[] = [];
  data.forEach(feedback => resultArr.push(mapJSONToFeedback(feedback)));
  return resultArr;
}

export function mapJSONToSurveyArray(surveys: any): Survey[] {
  const resultArr: Survey[] = [];
  surveys.forEach(survey => resultArr.push(mapJSONToSurvey(survey)));
  return resultArr;
}

export function mapJSONToSurvey(s: any): Survey {
  const surveyQuestions = mapJSONToSurveyQuestionArray(s.surveyQuestions);
  return new Survey(s.id, s.name, s.lanpartyId, s.startDate, s.endDate, surveyQuestions);
}

export function mapJSONToSurveyQuestionArray(surveyQuestions: any): SurveyQuestion[] {
  const resultArr: SurveyQuestion[] = [];
  surveyQuestions?.forEach(surveyQuestion => resultArr.push(mapJSONToSurveyQuestion(surveyQuestion)));
  return resultArr;
}

export function mapJSONToSurveyQuestion(sQ: any): SurveyQuestion {
  const surveyQuestionOptions = mapJSONToSurveyQuestionOptionArray(sQ.surveyQuestionOptions);
  const surveyQuestionOptionUserAnswers = mapJSONToSurveyQuestionUserAnswerArray(sQ.surveyQuestionUserAnswers);
  return new SurveyQuestion(sQ.id, sQ.question, sQ.surveyId, sQ.howManyAnswersAreAllowed,
    sQ.answerType, surveyQuestionOptions, surveyQuestionOptionUserAnswers);
}

export function mapJSONToSurveyQuestionOptionArray(surveyQuestionOptions: any): SurveyQuestionOption[] {
  const resultArr: SurveyQuestionOption[] = [];
  surveyQuestionOptions?.forEach(surveyQuestionOption => resultArr.push(mapJSONToSurveyQuestionOption(surveyQuestionOption)));
  return resultArr;
}

export function mapJSONToSurveyQuestionOption(sQO: any): SurveyQuestionOption {
  return new SurveyQuestionOption(sQO.id, sQO.questionOption, sQO.surveyQuestionId);
}

export function mapJSONToSurveyQuestionUserAnswerArray(surveyQuestionUserAnswers: any): SurveyQuestionUserAnswer[] {
  const resultArr: SurveyQuestionUserAnswer[] = [];
  surveyQuestionUserAnswers?.forEach(surveyQuestionUserAnswer =>
    resultArr.push(mapJSONToSurveyQuestionUserAnswer(surveyQuestionUserAnswer)));
  return resultArr;
}

export function mapJSONToSurveyQuestionUserAnswer(sQUA: any): SurveyQuestionUserAnswer {
  return new SurveyQuestionUserAnswer(sQUA.id, sQUA.booleanAnswer, sQUA.stringAnswer, sQUA.userId, sQUA.surveyQuestionId, sQUA.surveyQuestionOptionId);
}
