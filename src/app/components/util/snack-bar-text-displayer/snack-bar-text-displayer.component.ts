import {Component, Input} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-text-displayer',
  templateUrl: './snack-bar-text-displayer.component.html',
  styleUrls: ['./snack-bar-text-displayer.component.scss']
})
export class SnackBarTextDisplayerComponent {
  @Input() horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  @Input() verticalPosition: MatSnackBarVerticalPosition = 'top';
  @Input() message = 'No message';
  @Input() action = 'Close';
  @Input() showIcon = false;
  @Input() showButton = false;
  @Input() buttonText = 'Open';
  @Input() iconText = 'info';

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar() {
    this.snackBar.open(this.message, this.action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
