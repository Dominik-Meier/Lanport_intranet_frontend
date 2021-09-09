import { Component, OnInit } from '@angular/core';
import {ComponentWithNameComponent} from '../../../interfaces/componentWithName.component';

@Component({
  selector: 'app-feedback-configuration',
  templateUrl: './feedback-configuration.component.html',
  styleUrls: ['./feedback-configuration.component.scss']
})
export class FeedbackConfigurationComponent extends ComponentWithNameComponent implements OnInit {
  static componentName = 'FeedbackComponent';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
