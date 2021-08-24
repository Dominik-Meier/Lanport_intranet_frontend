import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as QuillNamespace from 'quill';
const Quill: any = QuillNamespace;
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import {ComponentWithNameComponent} from '../../../interfaces/componentWithName.component';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-html-displayer-configuration',
  templateUrl: './html-displayer-configuration.component.html',
  styleUrls: ['./html-displayer-configuration.component.scss']
})
export class HtmlDisplayerConfigurationComponent extends ComponentWithNameComponent implements OnInit {

  static componentName = 'HtmlDisplayerComponent';

  // TODO check this shit https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/angular.html
  constructor( public dialogRef: MatDialogRef<HtmlDisplayerConfigurationComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  // TODO not everything working in the toolbar, fix it or remov it
  // public config = "{ toolbar: [ 'heading', '|', 'bold', 'italic',
  // underline, strikethrough, '|', fontFamily, fontColor, fontSize, '|',  ] }"
  name: string;
  displayedString: string;
  startString: string;

  quillConfig = {
    // toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }, { header: 3 }],   // custom button values
        [{ list: 'ordered'}, { list: 'bullet' }],
        [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
        [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
        [{ direction: 'rtl' }],                         // text direction

        [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image', 'video'],
      ],
    },
    blotFormatter: {

    }
  };

  ngOnInit(): void {
    this.name = this.data.name;
    this.displayedString = this.data.data;
    this.startString = this.data.data;
  }

  changeString(event) {
    console.log(event.html);
    console.log(this.displayedString);
    this.displayedString = event.html;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  logContentChanged(event$) {
    console.log(event$);
  }

}
