import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Menu} from '../../models/Menu';
import {MenuItem} from '../../models/MenuItem';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MealOrder} from '../../models/MealOrder';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MealOrderOption} from '../../models/MealOrderOption';
import {MatAccordion} from '@angular/material/expansion';
import {User} from '../../models/User';

@Component({
  selector: 'app-order-meal',
  templateUrl: './order-meal.component.html',
  styleUrls: ['./order-meal.component.scss']
})
export class OrderMealComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() menus: Menu[];
  @Input()orders: MealOrder[] = [];
  @Input() userSelectable: boolean;
  selectedMenuItem: MenuItem;
  selectedOptions: FormGroup;
  selectedUser: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<OrderMealComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.data) {
      this.menus = this.data.menus;
      this.orders = this.data.orders;
      this.userSelectable = this.data.userSelectable;
    }
  }

  menuSelected(event) {
    const mealOptions = event.value?.meal?.mealOptions;
    this.selectedOptions = this.fb.group({});
    if (mealOptions) {
      mealOptions.forEach( option => this.selectedOptions.addControl(option.name, new FormControl(false)));
    }
  }

  isOrderable(menu: Menu) {
    const menuOrders = this.orders.filter( x => x.menuId.toString() === menu.id.toString());
    return menu.cultivable > menuOrders.length;
  }

  generateOrder() {
    const mealOrderOptions = [];
    this.selectedMenuItem.meal.mealOptions.forEach( option => {
      mealOrderOptions.push( new MealOrderOption( null, null, option.id, this.selectedOptions.get(option.name).value, null));
    });
    return new MealOrder(null, this.selectedMenuItem.menuId, this.selectedMenuItem.mealId, this.selectedUser?.id,
      null, '', null, mealOrderOptions, this.selectedMenuItem.meal, null, null);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
