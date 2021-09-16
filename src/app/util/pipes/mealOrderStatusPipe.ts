import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'mealOrderStatus'})
export class MealOrderStatusPipe implements PipeTransform {
  transform(mealStatus: string): string {
    if (mealStatus.toUpperCase() === 'ORDERED') {
      return 'Bestellt';
    } else if (mealStatus.toUpperCase() === 'PROGRESS') {
      return 'In Bearbeitung';
    } else if (mealStatus.toUpperCase() === 'MADE') {
      return 'Abholbereit';
    } else if (mealStatus.toUpperCase() === 'DONE') {
      return 'Abgeholt';
    }
  }
}
