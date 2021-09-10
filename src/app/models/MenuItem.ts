import {Meal} from './meal';

export class MenuItem {
  public id: number;
  public menuId: number;
  public mealId: number;
  public meal: Meal;


  constructor(id: number, menuId: number, mealId: number, meal: Meal) {
    this.id = id;
    this.menuId = menuId;
    this.mealId = mealId;
    this.meal = meal;
  }
}
