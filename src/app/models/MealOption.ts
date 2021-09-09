export class MealOption {
  public id: number;
  public name: string;
  public mealId: number;
  public infos: string;

  constructor(id: number, name: string, mealId: number, infos: string) {
    this.id = id;
    this.name = name;
    this.mealId = mealId;
    this.infos = infos;
  }
}
