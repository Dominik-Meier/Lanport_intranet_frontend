import {Component, Input, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from "../../../interfaces/componentWithName.component";
import {DataDisplyerComponent} from "../../../interfaces/dataDisplayer.component";
import {NavBarItem} from "../../../../models/NavBarItem";

@Component({
  selector: 'app-dynamic-register-options-configuration',
  templateUrl: './dynamic-register-options-configuration.component.html',
  styleUrls: ['./dynamic-register-options-configuration.component.scss']
})
export class DynamicRegisterOptionsConfigurationComponent extends ComponentWithNameComponent implements OnInit, DataDisplyerComponent   {
  static componentName = 'DynamicRegisterOptionsConfigurationComponent';
  @Input() data: any;
  navBarItem: NavBarItem = null;

  constructor() {
    super();
  }

  ngOnInit(): void {
    (this.data instanceof NavBarItem) ? this.navBarItem = this.data : null;
  }

}
