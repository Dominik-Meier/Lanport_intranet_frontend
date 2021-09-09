import {Meal} from '../../models/meal';
import {MealOption} from '../../models/MealOption';


export function mealDiffer(oldMeal: Meal, newMeal: Meal) {
  if (oldMeal.name !== newMeal.name) {oldMeal.name = newMeal.name; }
  if (oldMeal.startTime !== newMeal.startTime) {oldMeal.startTime = newMeal.startTime; }
  if (oldMeal.endTime !== newMeal.endTime) {oldMeal.endTime = newMeal.endTime; }
  if (oldMeal.lanpartyId !== newMeal.lanpartyId) {oldMeal.lanpartyId = newMeal.lanpartyId; }
  if (oldMeal.infos !== newMeal.infos) {oldMeal.infos = newMeal.infos; }
}

export function mealOptionDiffer(oldMealOption: MealOption, newMealOption: MealOption) {
  if (oldMealOption.name !== newMealOption.name) {oldMealOption.name = newMealOption.name; }
  if (oldMealOption.infos !== newMealOption.infos) {oldMealOption.infos = newMealOption.infos; }
}

