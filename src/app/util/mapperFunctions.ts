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
import {FeedbackConfigurationComponent} from '../components/1_registerOptions-Component/feedback/feedback-configuration/feedback-configuration.component';
import {MealOption} from '../models/MealOption';
import {Meal} from '../models/meal';
import {FeedbackComponent} from '../components/1_registerOptions-Component/feedback/feedback.component';
import {MenuItem} from '../models/MenuItem';
import {Menu} from '../models/Menu';
import {MealOrderComponent} from '../components/1_registerOptions-Component/meal-order/meal-order.component';
import {MealOrderConfigurationComponent} from '../components/1_registerOptions-Component/meal-order/meal-order-configuration/meal-order-configuration.component';
import {MealOrder} from '../models/MealOrder';
import {MealOrderOption} from '../models/MealOrderOption';


export const navBarComponentSelectorMap: Map<string, ComponentWithNameComponent> = new Map<string, any>();
navBarComponentSelectorMap.set('HtmlDisplayerComponent', HtmlDisplayerComponent);
navBarComponentSelectorMap.set('TournamentComponent', TournamentComponent);
navBarComponentSelectorMap.set('HrefComponent', HrefComponent);
navBarComponentSelectorMap.set('FeedbackComponent', FeedbackComponent);
navBarComponentSelectorMap.set('MealOrderComponent', MealOrderComponent);

export const navBarItemComponentConfigurationSelectorMap: Map<string, ComponentWithNameComponent> = new Map<string, any>();
navBarItemComponentConfigurationSelectorMap.set('HtmlDisplayerComponent', HtmlDisplayerConfigurationComponent);
navBarItemComponentConfigurationSelectorMap.set('TournamentComponent', TournamentConfigurationComponent);
navBarItemComponentConfigurationSelectorMap.set('HrefComponent', HrefConfigurationComponent);
navBarItemComponentConfigurationSelectorMap.set('FeedbackComponent', FeedbackConfigurationComponent);
navBarItemComponentConfigurationSelectorMap.set('MealOrderComponent', MealOrderConfigurationComponent);


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
  let appComponents = [];
  for ( const element of data) {
    let componentOuter = null;
    if (navBarComponentSelectorMap.has(element.usedComponent)) {
      componentOuter = navBarComponentSelectorMap.get(element.usedComponent);
    }

    if (element.appComponents && element.appComponents.length > 0) {
      appComponents = mapJSONToAppSettingsArray(element.appComponents);
    }

    resultArr.push( new NavBarItem(element.id, element.name, element.usedComponent, element.appComponentId, appComponents,
      element.data, element.activeForIntranet, element.activeForBeamerPresentation, element.icon, false, element.beamerTimer));
    appComponents = [];
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

export function mapJSONToMealArray(data: any): Meal[] {
  const meals: Meal[] = [];
  data.forEach(meal => meals.push(mapJSONToMeal(meal)));
  return meals;
}

export function mapJSONToMeal(data: any): Meal {
  const mealOptions: MealOption[] = [];
  data?.mealOptions?.forEach( mo => mealOptions.push(mapJSONToMealOption(mo)));
  return new Meal(data.id , data.name, data.startTime, data.endTime, data.lanpartyId, mealOptions, data.infos);
}

export function mapJSONToMealOption(data: any): MealOption {
  return new MealOption(data.id , data.name, data.mealId, data.infos);
}

export function mapJSONToMenuArray(data: any): Menu[] {
  const menus = [];
  data?.forEach(menu => menus.push(mapJSONToMenu(menu)));
  return menus;
}

export function mapJSONToMenu(data: any): Menu {
  return new Menu(data.id , data.name, data.startTime, data.endTime, data.lanpartyId, data.infos, data.cultivable,
    mapJSONToMenuItemArray(data.menuItems));
}

export function mapJSONToMenuItem(data: any): MenuItem {
  return new MenuItem(data.id , data.menuId, data.mealId, mapJSONToMeal(data.meal));
}

export function mapJSONToMenuItemArray(data: any): MenuItem[] {
  const menuItems = [];
  data?.forEach(menuItem => menuItems.push(mapJSONToMenuItem(menuItem)));
  return menuItems;
}

export function mapJSONToMealOrderArray(data: any): MealOrder[] {
  const mealOrders = [];
  data?.forEach(mealOrder => mealOrders.push(mapJSONToMealOrder(mealOrder)));
  return mealOrders;
}

export function mapJSONToMealOrder(data: any): MealOrder {
  const mealOrderOptions = mapJSONToMealOrderOptionsArray(data.mealOrderOptions);
  return new MealOrder(data.id, data.menuId, data.mealId, data.userId, data.status, data.extras,
    data.orderTime, mealOrderOptions, data.meal, data.user, data.menu);
}

export function mapJSONToMealOrderOptionsArray(data: any): MealOrderOption[] {
  const mealOrderOptions = [];
  data?.forEach(mealOrderOption => mealOrderOptions.push(mapJSONToMealOrderOption(mealOrderOption)));
  return mealOrderOptions;
}

export function mapJSONToMealOrderOption(data: any): MealOrderOption {
  return new MealOrderOption(data.id, data.mealOrderId, data.mealOptionId, data.isOrdered, data.mealOption);
}
