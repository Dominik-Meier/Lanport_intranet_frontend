import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {RegisterOptionItem} from "../../../models/registerOptionItem";

@Component({
  selector: 'app-info-register-item',
  templateUrl: './info-register-item.component.html',
  styleUrls: ['./info-register-item.component.scss']
})
export class InfoRegisterItemComponent implements OnInit, OnChanges {
  @ViewChild('navbaritemdivcontainer') private element: ElementRef;
  @Input() registerItem: RegisterOptionItem;
  @Input() active: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onMouseEnter(event) {
    event.target.classList.remove('register-item-box');
    event.target.classList.add('register-item-box-hover');
  }

  onMouseLeave(event) {
    event.target.classList.remove('register-item-box-hover');
    event.target.classList.add('register-item-box');
  }

  onSelect(event) {
  }
}
