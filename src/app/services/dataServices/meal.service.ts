import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EventEmitterService} from '../event-emitter.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {
  mapJSONToMeal,
  mapJSONToMealArray,
  mapJSONToMealOrder,
  mapJSONToMealOrderArray
} from '../../util/mapperFunctions';
import {Meal} from '../../models/meal';
import {MealOption} from '../../models/MealOption';
import {mealDiffer, mealOptionDiffer} from '../../util/modelDiffers/mealUpdater';
import {Subject} from 'rxjs';
import {MealOrder} from "../../models/MealOrder";

@Injectable({
  providedIn: 'root'
})
export class MealService {
  url = environment.BASE_API_URL;
  meals: Meal[] = [];
  mealsSubject = new Subject<Meal[]>();
  mealsObservable = this.mealsSubject.asObservable();

  constructor(private http: HttpClient, private eventEmitter: EventEmitterService) {
    this.getMeals().subscribe( m => {
      this.meals = m;
      this.mealsSubject.next(this.meals);
    });
    this.eventEmitter.mealCreatedObservable.subscribe(m => this.localAddMeal(m));
    this.eventEmitter.mealUpdatedObservable.subscribe(m => this.localUpdateMeal(m));
    this.eventEmitter.mealDeletedObservable.subscribe(m => this.localDeleteMeal(m));
    this.eventEmitter.mealOptionCreatedObservable.subscribe(mo => this.localAddMealOption(mo));
    this.eventEmitter.mealOptionUpdatedObservable.subscribe(mo => this.localUpdateMealOption(mo));
    this.eventEmitter.mealOptionDeletedObservable.subscribe(mo => this.localDeleteMealOption(mo));
  }

  private localAddMeal(meal: Meal) {
    this.meals.push(meal);
    this.mealsSubject.next(this.meals);
  }

  private localUpdateMeal(meal: Meal) {
    const oldMeal = this.meals.find(x => x.id.toString() === meal.id.toString());
    mealDiffer(oldMeal, meal);
    this.mealsSubject.next(this.meals);
  }

  private localDeleteMeal(meal: Meal) {
    const index = this.meals.findIndex( x => x.id.toString() === meal.id.toString());
    if (index !== null) {
      this.meals.splice(index, 1);
    }
    this.mealsSubject.next(this.meals);
  }

  private localAddMealOption(mealOption: MealOption) {
    const meal = this.meals.find(x => x.id.toString() === mealOption.mealId.toString());
    meal.mealOptions.push(mealOption);
    this.mealsSubject.next(this.meals);
  }

  private localUpdateMealOption(mealOption: MealOption) {
    const meal = this.meals.find(x => x.id === mealOption.mealId);
    const oldMealOption = meal.mealOptions.find(x => x.id.toString() === mealOption.id.toString());
    mealOptionDiffer(oldMealOption, mealOption);
    this.mealsSubject.next(this.meals);
  }

  private localDeleteMealOption(mealOption: MealOption) {
    const meal = this.meals.find(x => x.id === mealOption.mealId);
    const index = meal.mealOptions.findIndex(x => x.id.toString() === mealOption.id.toString());
    if (index !== null) {
      meal.mealOptions.splice(index, 1);
    }
    this.mealsSubject.next(this.meals);
  }

  getMeals() {
    const targetURL = this.url + 'meal/';
    return this.http.get(targetURL).pipe(map( meals => mapJSONToMealArray(meals)));
  }

  getMeal(id: number) {
    const targetURL = this.url + 'meal/' + id.toString();
    return this.http.get(targetURL).pipe(map( meal => mapJSONToMeal(meal)));
  }

  createMeal() {
    const targetURL = this.url + 'meal/';
    return this.http.post(targetURL, null);
  }

  createMealOption(mealId) {
    const targetURL = this.url + 'meal/' + mealId.toString() + '/option/';
    return this.http.post(targetURL, null);
  }

  updateMeal(meal) {
    const targetURL = this.url + 'meal/' + meal.id.toString();
    return this.http.put(targetURL, meal);
  }

  updateMealOption(mealOption) {
    const targetURL = this.url + 'meal/option/' + mealOption.id.toString();
    return this.http.put(targetURL, mealOption);
  }

  deleteMeal(id) {
    const targetURL = this.url + 'meal/' + id.toString();
    return this.http.delete(targetURL);
  }

  deleteMealOption(id) {
    const targetURL = this.url + 'meal/option/' + id.toString();
    return this.http.delete(targetURL);
  }

  getAllOrderedMeals() {
    const targetURL = this.url + 'mealOrder';
    return this.http.get(targetURL).pipe( map( data => mapJSONToMealOrderArray(data)));
  }

  getAllOrderedMealsByUserId(userId) {
    const targetURL = this.url + 'mealOrder';
    return this.http.get(targetURL, {params: {userId}}).pipe( map( data => mapJSONToMealOrderArray(data)));
  }

  orderMeal(mealOrder: MealOrder) {
    const targetURL = this.url + 'mealOrder';
    return this.http.post(targetURL, mealOrder);
  }

  updateMealStatus(mealOrderId, newStatus: string) {
    const targetURL = this.url + 'mealOrder/' + mealOrderId.toString() + '/status/' + newStatus.toString();
    return this.http.put(targetURL, null);
  }
}
