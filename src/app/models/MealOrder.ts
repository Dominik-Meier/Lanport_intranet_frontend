import {Meal} from './meal';
import {User} from './User';
import {MealOrderOption} from './MealOrderOption';
import {Menu} from './Menu';

export class MealOrder {
  public id: number;
  public menuId: number;
  public mealId: number;
  public userId: number;
  public status: string;
  public extras: string;
  public orderTime: Date;
  public mealOrderOptions: MealOrderOption[];
  public meal: Meal;
  public user: User;
  public menu: Menu;


  constructor(id: number, menuId: number, mealId: number, userId: number, status: string, extras: string,
              orderTime: Date, mealOrderOptions: MealOrderOption[], meal: Meal, user: User, menu: Menu) {
    this.id = id;
    this.menuId = menuId;
    this.mealId = mealId;
    this.userId = userId;
    this.status = status;
    this.extras = extras;
    this.orderTime = orderTime;
    this.mealOrderOptions = mealOrderOptions;
    this.meal = meal;
    this.user = user;
    this.menu = menu;
  }
}
