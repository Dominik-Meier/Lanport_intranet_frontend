import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MenuService} from '../../services/dataServices/menu.service';
import {Menu} from '../../models/Menu';
import {MealService} from '../../services/dataServices/meal.service';
import {Meal} from '../../models/meal';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MenuItem} from '../../models/MenuItem';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  mealControl = new FormControl();
  menu: Menu;
  meals: Meal[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CreateMenuComponent>,
              private menuService: MenuService,
              private mealService: MealService) { }

  ngOnInit(): void {
    this.menu = this.data.menu;
    this.meals = this.mealService.meals;
    this.subscriptions.push(this.mealService.mealsObservable.subscribe( meals => this.meals = meals));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addMeal(mealId) {
    this.menuService.createMenuItem(this.menu.id, mealId).subscribe();
  }

  removeMenuItem(menuItem: MenuItem) {
    this.menuService.deleteMenuItem(menuItem.id).subscribe();
  }
}
