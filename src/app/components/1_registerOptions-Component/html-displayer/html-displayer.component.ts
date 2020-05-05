import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {RegisterOptionItem} from "../../../models/registerOptionItem";
import {DataDisplyerComponent} from "../../interfaces/dataDisplayer.component";
import {ComponentWithNameComponent} from "../../interfaces/componentWithName.component";

@Component({
  selector: 'app-html-displayer',
  templateUrl: './html-displayer.component.html',
  styleUrls: ['./html-displayer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HtmlDisplayerComponent extends ComponentWithNameComponent implements OnInit, DataDisplyerComponent  {
  static componentName = "HtmlDisplayerComponent";
  @Input() data: any;
  htmlString: SafeHtml;
  htmlStringHardcoded: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    // TODO remove hardcoded String
    // TODO maybe check first if data ist from type RegisterOptionItem, but maybe this is not always the case!
    this.htmlStringHardcoded = this.sanitizer.bypassSecurityTrustHtml("<div style=\"max-width: 50%; margin: auto;\"><h2>" + this.data.getName() + "</h2><br><p>Das ist eine hargecodeder HMTL string!</p></div>");
    if (this.data.getData()){
      this.htmlString = this.sanitizer.bypassSecurityTrustHtml(this.data.getData());
    }
  }
}
