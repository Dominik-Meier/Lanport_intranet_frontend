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
export class HtmlDisplayerComponent extends ComponentWithNameComponent implements OnInit  {
  static componentName = "HtmlDisplayerComponent";
  @Input() registerItem: RegisterOptionItem;
  htmlStringTODO: SafeHtml = "TODO"

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    //TODO make it variable over settings not hard coded!
    this.htmlStringTODO = this.sanitizer.bypassSecurityTrustHtml("<div style=\"max-width: 50%; margin: auto;\"><h2>" + this.registerItem.getName() + "</h2><br><p>Das ist eine hargecodeder HMTL string!</p></div>");
  }
}
