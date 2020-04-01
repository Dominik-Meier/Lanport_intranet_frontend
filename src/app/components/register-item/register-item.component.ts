import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {RegisterOptionItem} from "../../models/registerOptionItem";

@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.scss']
})
export class RegisterItemComponent implements OnInit, OnChanges {
  @ViewChild('navbaritemdivcontainer') private element: ElementRef;
  @Output() itemSelected = new EventEmitter<RegisterOptionItem>();
  @Input() registerItem: RegisterOptionItem;
  @Input() active: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.registerItem.getActive()) {
      this.element.nativeElement.classList.remove('register-item-box');
      this.element.nativeElement.classList.add('register-item-box-hover');
    }

    if (this.element) {
      if (!this.registerItem.getActive() && this.element.nativeElement.classList.contains('register-item-box-hover')) {
        this.element.nativeElement.classList.remove('register-item-box-hover');
        this.element.nativeElement.classList.add('register-item-box');
      }
    }
  }

  onMouseEnter(event) {
    event.target.classList.remove('register-item-box');
    event.target.classList.add('register-item-box-hover');
  }

  onMouseLeave(event) {
    if (!this.active) {
      event.target.classList.remove('register-item-box-hover');
      event.target.classList.add('register-item-box');
    }
  }

  onSelect(event) {
    this.registerItem.setActive(true);
    this.itemSelected.emit(this.registerItem);
  }
}
