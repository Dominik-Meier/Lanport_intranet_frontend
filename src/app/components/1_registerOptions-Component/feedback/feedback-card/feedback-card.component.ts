import {Component, Input, OnInit} from '@angular/core';
import {Feedback} from '../../../../models/Feedback';

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.scss']
})
export class FeedbackCardComponent implements OnInit {
  @Input() feedback: Feedback;

  constructor() { }

  ngOnInit(): void {
  }

}
