import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from '../../../interfaces/componentWithName.component';

@Component({
  selector: 'app-meal-order-configuration',
  templateUrl: './meal-order-configuration.component.html',
  styleUrls: ['./meal-order-configuration.component.scss']
})
export class MealOrderConfigurationComponent extends ComponentWithNameComponent implements OnInit, OnDestroy {
  static componentName = 'MealOrderComponent';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
