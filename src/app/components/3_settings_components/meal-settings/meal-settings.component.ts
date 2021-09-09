import {Component, OnDestroy, OnInit} from '@angular/core';
import {MealService} from '../../../services/dataServices/meal.service';
import {Meal} from '../../../models/meal';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {CreateMealComponent} from '../../create-meal/create-meal.component';

@Component({
  selector: 'app-meal-settings',
  templateUrl: './meal-settings.component.html',
  styleUrls: ['./meal-settings.component.scss']
})
export class MealSettingsComponent implements OnInit, OnDestroy {
  meals: Meal[] = [];
  dataSource: MatTableDataSource<Meal>;
  subscriptions: Subscription[] = [];
  dialogRef: MatDialogRef<any>;
  currentRow: any;

  columnsToDisplay = ['name', 'actions'];

  constructor(private mealService: MealService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.meals = this.mealService.meals;
    this.updateData();
    this.subscriptions.push(this.mealService.mealsObservable.subscribe( meals => {
      this.meals = meals;
      this.updateData();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  updateData() {
    if (this.dialogRef && this.currentRow) {
      this.dialogRef.componentInstance.data = this.currentRow;
    }
    this.dataSource = new MatTableDataSource<Meal>(this.meals);
  }

  newMeal() {
    this.mealService.createMeal().subscribe();
  }

  updateMeal(row) {
    const dialogRef = this.dialog.open( CreateMealComponent, {
      width: '50vw',
      minWidth: '350px',
      data: {meal: row}
    });
    dialogRef.afterClosed().subscribe(updatedMeal => {
      if (updatedMeal) {
        this.mealService.updateMeal(updatedMeal).subscribe();
      }
    });
  }

  deleteMeal(row) {
    this.mealService.deleteMeal(row.id).subscribe();
  }

}
