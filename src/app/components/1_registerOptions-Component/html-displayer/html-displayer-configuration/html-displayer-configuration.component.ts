import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as QuillNamespace from 'quill';
const Quill: any = QuillNamespace;
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import {ComponentWithNameComponent} from '../../../interfaces/componentWithName.component';
import { quillConfig } from '../../../../util/quillConfig';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-html-displayer-configuration',
  templateUrl: './html-displayer-configuration.component.html',
  styleUrls: ['./html-displayer-configuration.component.scss']
})
export class HtmlDisplayerConfigurationComponent extends ComponentWithNameComponent implements OnInit {
  static componentName = 'HtmlDisplayerComponent';
  name: string;
  displayedString: string;
  startString: string;
  quillConfig = quillConfig;

  // TODO check this shit https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/angular.html
  constructor( public dialogRef: MatDialogRef<HtmlDisplayerConfigurationComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }
  ngOnInit(): void {
    this.name = this.data.name;
    this.displayedString = this.data.data;
    this.startString = this.data.data;
  }

  changeString(event) {
    this.displayedString = event.html;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
