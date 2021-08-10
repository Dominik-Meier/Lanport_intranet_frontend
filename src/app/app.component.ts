import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DynamicElementService} from './services/dynamic-element.service';
import {WebSocketService} from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'intranet';
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;

  constructor( private dynamicElementService: DynamicElementService,
               private ws: WebSocketService) {
  }

  ngOnInit() {
    this.dynamicElementService.setInsertionPoint(this.dynamicElementInsertionPoint);
    this.ws.connect();
  }

}
