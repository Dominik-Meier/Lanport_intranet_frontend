import {Component, Inject, Input, OnInit} from '@angular/core';
import {Meal} from '../../models/meal';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MealService} from '../../services/dataServices/meal.service';
import {MealOption} from "../../models/MealOption";

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.scss']
})
export class CreateMealComponent implements OnInit {
  meal: Meal;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CreateMealComponent>,
              private mealService: MealService) { }

  ngOnInit(): void {
    this.meal = this.data.meal;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addMealOption() {
    this.mealService.createMealOption(this.meal.id).subscribe();
  }

  saveMealOption(mealOption: MealOption) {
    this.mealService.updateMealOption(mealOption).subscribe();
  }
}
