import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-html-displayer-configuration',
  templateUrl: './html-displayer-configuration.component.html',
  styleUrls: ['./html-displayer-configuration.component.scss']
})
export class HtmlDisplayerConfigurationComponent implements OnInit {

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

  onNoClick(): void {
    this.dialogRef.close()
  }

  logContentChanged(event$) {
    console.log(event$)
  }

  quillConfig={
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link', 'image'],
        //['link', 'image', 'video']
      ],
      //   handlers: {'emoji': function() {}}
    },
  }

}
