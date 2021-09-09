import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from '../../interfaces/componentWithName.component';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {FeedbackModalComponent} from './feedback-modal/feedback-modal.component';
import {Feedback} from '../../../models/Feedback';
import {AuthService} from '../../../services/auth-service.service';
import {FeedbackService} from '../../../services/dataServices/feedback.service';
import {EventEmitterService} from '../../../services/event-emitter.service';
import {feedbackDiffer} from '../../../util/modelDiffers/feedbackUpdater';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent extends ComponentWithNameComponent implements OnInit, OnDestroy {
  static componentName = 'FeedbackComponent';
  private subscriptions: Subscription[] = [];
  private feedback: Feedback[] = [];
  @Input() data: any;

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private feedbackService: FeedbackService,
              private eventEmitter: EventEmitterService) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(this.feedbackService.getFeedback().subscribe( f => this.feedback = f));
    this.subscriptions.push(this.eventEmitter.feedbackCreatedObservable.subscribe(f => this.addFeedback(f)));
    this.subscriptions.push(this.eventEmitter.feedbackUpdatedObservable.subscribe(f => this.updateFeedback(f)));
    this.subscriptions.push(this.eventEmitter.feedbackDeletedObservable.subscribe(f => this.deleteFeedback(f)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  addFeedback(feedback: Feedback) {
    this.feedback.push(feedback);
  }

  updateFeedback(feedback: Feedback) {
    const oldFeedback = this.feedback.find( x => x.id.toString() === feedback.id.toString());
    feedbackDiffer(oldFeedback, feedback);
  }

  deleteFeedback(feedback: Feedback) {
    const index = this.feedback.findIndex(x => x .id.toString() === feedback.id.toString());
    if (index > -1) {
      this.feedback.splice(index, 1);
    }
  }

  newFeedback() {
    const feedback = new Feedback(null, '', '', '', false, false,
      this.authService.getActiveUser().getId(), this.authService.getActiveUser(), null);
    const dialogRef = this.dialog.open( FeedbackModalComponent, {
      width: '50vw',
      minWidth: '350px',
      data: {feedback, disabled: false}
    });
    dialogRef.afterClosed().subscribe(updatedFeedback => {
      if (updatedFeedback) {
        this.feedbackService.createFeedback(updatedFeedback).subscribe();
      }
    });
  }

  showFeedback(feedback) {
    this.dialog.open( FeedbackModalComponent, {
      width: '50vw',
      minWidth: '350px',
      data: {feedback, disabled: true}
    });
  }

}
