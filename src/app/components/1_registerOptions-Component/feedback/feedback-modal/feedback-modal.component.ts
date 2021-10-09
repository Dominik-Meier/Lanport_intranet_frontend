import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Feedback} from '../../../../models/Feedback';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit {
  feedback: Feedback;
  disabled: true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FeedbackModalComponent>) { }

  ngOnInit(): void {
    this.feedback = this.data.feedback;
    this.disabled = this.data.disabled;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
