import {MealOrder} from '../models/MealOrder';

export function mealOrderStatusUpdateAction(orderList: MealOrder[], newOrder: MealOrder) {
  const order = orderList.find(x => x.id.toString() === newOrder.id.toString());
  if (order) {
    order.status = newOrder.status;
  }
}
