import {MealOption} from './MealOption';

export class MealOrderOption {
  public id: number;
  public mealOrderId: number;
  public mealOptionId: number;
  public isOrdered: boolean;
  public mealOption: MealOption;


  constructor(id: number, mealOrderId: number, mealOptionId: number, isOrdered: boolean, mealOption: MealOption) {
    this.id = id;
    this.mealOrderId = mealOrderId;
    this.mealOptionId = mealOptionId;
    this.isOrdered = isOrdered;
    this.mealOption = mealOption;
  }
}
