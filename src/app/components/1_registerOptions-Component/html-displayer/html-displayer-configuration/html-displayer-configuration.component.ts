import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-html-displayer-configuration',
  templateUrl: './html-displayer-configuration.component.html',
  styleUrls: ['./html-displayer-configuration.component.scss']
})
export class HtmlDisplayerConfigurationComponent implements OnInit {
  public Editor = DecoupledEditor;
  // TODO not everything working in the toolbar, fix it or remov it
  // public config = "{ toolbar: [ 'heading', '|', 'bold', 'italic', underline, strikethrough, '|', fontFamily, fontColor, fontSize, '|',  ] }"
  name: string;
  displayedString: string;
  startString: string;

  // TODO check this shit https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/angular.html
  constructor( public dialogRef: MatDialogRef<HtmlDisplayerConfigurationComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.name = this.data.name;
    this.displayedString = this.data.data;
    this.startString = this.data.data;
  }

  changeString(event) {
    console.log(event);
    console.log(this.displayedString);
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  public onReady (editor) {
    // console.log(Array.from( editor.ui.componentFactory.names()));
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

}
