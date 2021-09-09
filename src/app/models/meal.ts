import {MealOption} from './MealOption';

export class Meal {
  public id: number;
  public name: string;
  public startTime: Date;
  public endTime: Date;
  public lanpartyId: number;
  public mealOptions: MealOption[];
  public infos: string;


  constructor(id: number, name: string, startTime: Date, endTime: Date, lanpartyId: number, mealOptions: MealOption[], infos: string) {
    this.id = id;
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.lanpartyId = lanpartyId;
    this.mealOptions = mealOptions;
    this.infos = infos;
  }
}
