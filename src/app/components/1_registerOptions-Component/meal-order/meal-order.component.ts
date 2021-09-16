import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ComponentWithNameComponent} from '../../interfaces/componentWithName.component';
import {MenuService} from '../../../services/dataServices/menu.service';
import {Subscription} from 'rxjs';
import {Menu} from '../../../models/Menu';
import {OAuthService} from 'angular-oauth2-oidc';
import {AuthService} from '../../../services/auth-service.service';
import {MatAccordion} from '@angular/material/expansion';
import {MenuItem} from '../../../models/MenuItem';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MealOrderOption} from '../../../models/MealOrderOption';
import {MealOrder} from '../../../models/MealOrder';
import {MealService} from '../../../services/dataServices/meal.service';
import {EventEmitterService} from '../../../services/event-emitter.service';
import {mealOrderStatusUpdateAction} from '../../../util/sharedFunctions';

@Component({
  selector: 'app-meal-order',
  templateUrl: './meal-order.component.html',
  styleUrls: ['./meal-order.component.scss']
})
export class MealOrderComponent extends ComponentWithNameComponent implements OnInit, OnDestroy {
  static componentName = 'MealOrderComponent';
  private subscriptions: Subscription[] = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() data: any;
  menus: Menu[];
  orders: MealOrder[] = [];
  selectedMenuItem: MenuItem;
  selectedOptions: FormGroup;

  constructor(private menuService: MenuService,
              private mealService: MealService,
              private authService: AuthService,
              private eventEmitter: EventEmitterService,
              private fb: FormBuilder) {
    super();
    this.menus = this.menuService.menus;
    this.subscriptions.push(this.menuService.getMenus().subscribe( menus => this.menus = menus));
    this.subscriptions.push(this.eventEmitter.menuCreatedObservable.subscribe(m => this.menus.push(m)));
    this.subscriptions.push(this.eventEmitter.mealOrderPlacedObservable.subscribe((order: MealOrder) => this.newOrder(order)));
    this.subscriptions.push(this.mealService.getAllOrderedMealsByUserId(
      this.authService.getActiveUser().id).subscribe(orders => this.orders = orders));
    this.subscriptions.push(this.eventEmitter.mealOrderStatusUpdatedObservable.subscribe(o => mealOrderStatusUpdateAction(this.orders, o)));
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  menuSelected(event) {
    const mealOptions = event.value?.meal?.mealOptions;
    this.selectedOptions = this.fb.group({});
    if (mealOptions) {
      mealOptions.forEach( option => this.selectedOptions.addControl(option.name, new FormControl(false)));
    }
  }

  onSubmit() {
    const mealOrderOptions = [];
    this.selectedMenuItem.meal.mealOptions.forEach( option => {
      mealOrderOptions.push( new MealOrderOption( null, null, option.id, this.selectedOptions.get(option.name).value, null));
    });
    const mealOrder = new MealOrder(null, this.selectedMenuItem.menuId, this.selectedMenuItem.mealId, this.authService.getActiveUser().id,
      null, '', null, mealOrderOptions, this.selectedMenuItem.meal, null, null);
    this.mealService.orderMeal(mealOrder).subscribe();
  }

  newOrder(order: MealOrder) {
    if (this.authService.getActiveUser().id.toString() === order.user.id.toString()) {
      this.orders.push(order);
    }
  }

  isOrderable(menu: Menu) {
    const menuOrders = this.orders.filter( x => x.menuId.toString() === menu.id.toString());
    return menu.cultivable > menuOrders.length;
  }
}
