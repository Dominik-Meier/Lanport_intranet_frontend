import {Component, Inject, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from '../../../interfaces/componentWithName.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-href-configuration',
  templateUrl: './href-configuration.component.html',
  styleUrls: ['./href-configuration.component.scss']
})
export class HrefConfigurationComponent extends ComponentWithNameComponent implements OnInit {
  static componentName = 'HrefComponent';
  name: string;
  link: string;

  constructor(public dialogRef: MatDialogRef<HrefConfigurationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit(): void {
    this.name = this.data.name;
    this.link = this.data.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
