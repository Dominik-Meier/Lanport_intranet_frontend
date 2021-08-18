import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {DataDisplayerComponent} from '../../interfaces/dataDisplayer.component';
import {ComponentWithNameComponent} from '../../interfaces/componentWithName.component';
import * as QuillNamespace from 'quill';
const Quill: any = QuillNamespace;
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import {EventEmitterService} from '../../../services/event-emitter.service';
import {resolveNewHtmlDisplayerValue} from '../../../util/configUpdaterHandlerFunctions';
import {Subscription} from 'rxjs';
Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-html-displayer',
  templateUrl: './html-displayer.component.html',
  styleUrls: ['./html-displayer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HtmlDisplayerComponent extends ComponentWithNameComponent implements OnInit, DataDisplayerComponent, OnDestroy  {

  constructor(private eventEmitter: EventEmitterService) {
    super();
  }
  static componentName = 'HtmlDisplayerComponent';
  private subscriptions: Subscription[] = [];
  @Input() data: any;

  quillConfig = {
    toolbar: false,
  };

  ngOnInit(): void {
    this.subscriptions.push(this.eventEmitter.appConfigChangedObservable.subscribe(newConfig => {
      resolveNewHtmlDisplayerValue(this.data, newConfig);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
