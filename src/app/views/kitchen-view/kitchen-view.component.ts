import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MealService} from '../../services/dataServices/meal.service';
import {MenuService} from '../../services/dataServices/menu.service';
import {EventEmitterService} from '../../services/event-emitter.service';
import {Subscription} from 'rxjs';
import {MealOrder} from '../../models/MealOrder';
import {mealOrderStatusUpdateAction} from '../../util/sharedFunctions';
import {MatDialog} from '@angular/material/dialog';
import {OrderMealComponent} from '../../components/order-meal/order-meal.component';
import {Menu} from '../../models/Menu';

@Component({
  selector: 'app-kitchen-view',
  templateUrl: './kitchen-view.component.html',
  styleUrls: ['./kitchen-view.component.scss']
})
export class KitchenViewComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  orders: MealOrder[];
  menus: Menu[];

  constructor(private router: Router,
              private mealService: MealService,
              private menuService: MenuService,
              private eventEmitter: EventEmitterService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.menus = this.menuService.menus;
    this.subscriptions.push(this.menuService.getMenus().subscribe( menus => this.menus = menus));
    this.subscriptions.push(this.eventEmitter.menuCreatedObservable.subscribe(m => this.menus.push(m)));
    this.subscriptions.push(this.mealService.getAllOrderedMeals().subscribe( orders => this.orders = orders));
    this.subscriptions.push(this.eventEmitter.mealOrderPlacedObservable.subscribe( o => this.newOrderPlaced(o)));
    this.subscriptions.push(this.eventEmitter.mealOrderStatusUpdatedObservable.subscribe(o => mealOrderStatusUpdateAction(this.orders, o)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  newOrderPlaced(order: MealOrder) {
    if (!this.orders.find(x => x.id.toString() === order.id.toString())) {
      this.orders.push(order);
    }
  }

  statusUpdate(order: MealOrder, newStatus: string) {
    this.mealService.updateMealStatus(order.id, newStatus).subscribe();
  }

  createNewOrder() {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.router.navigate(['home']);
    }
  }
}
