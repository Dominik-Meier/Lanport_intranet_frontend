import {Component, Input, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from '../../interfaces/componentWithName.component';
import {DataDisplayerComponent} from '../../interfaces/dataDisplayer.component';

@Component({
  selector: 'app-href-component',
  templateUrl: './href.component.html',
})

export class HrefComponent extends ComponentWithNameComponent implements DataDisplayerComponent, OnInit {
  static componentName = 'HrefComponent';
  @Input() data: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
    document.location.href = this.data.data;
  }
}
