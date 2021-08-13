import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {DataDisplayerComponent} from '../../interfaces/dataDisplayer.component';
import {ComponentWithNameComponent} from '../../interfaces/componentWithName.component';
import * as QuillNamespace from 'quill';
const Quill: any = QuillNamespace;
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-html-displayer',
  templateUrl: './html-displayer.component.html',
  styleUrls: ['./html-displayer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HtmlDisplayerComponent extends ComponentWithNameComponent implements OnInit, DataDisplayerComponent  {

  constructor() {
    super();
  }
  static componentName = 'HtmlDisplayerComponent';
  @Input() data: any;
  quillString: string;

  quillConfig = {
    toolbar: false,
  };

  ngOnInit(): void {
    this.quillString = this.data.getData();
  }
}
