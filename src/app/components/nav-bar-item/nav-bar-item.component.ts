import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {NavBarItem} from "../../models/NavBarItem";
import {NavBarItemService} from "../../services/nav-bar-item.service";

@Component({
  selector: 'app-nav-bar-item',
  templateUrl: './nav-bar-item.component.html',
  styleUrls: ['./nav-bar-item.component.scss']
})
export class NavBarItemComponent implements OnChanges {
  @ViewChild('navbaritemdivcontainer') private element: ElementRef;
  @Input() navItem: NavBarItem;
  @Input() active: boolean;

  constructor(private navBarItemService: NavBarItemService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.navItem.getActive() && this.element) {
      this.element.nativeElement.classList.remove('nav-bar-item-box');
      this.element.nativeElement.classList.add('nav-bar-item-box-hover');
    }

    if (this.element) {
      if (!this.navItem.getActive() && this.element.nativeElement.classList.contains('nav-bar-item-box-hover')) {
        this.element.nativeElement.classList.remove('nav-bar-item-box-hover');
        this.element.nativeElement.classList.add('nav-bar-item-box');
      }
    }
  }

  onMouseEnter(event) {
    event.target.classList.remove('nav-bar-item-box');
    event.target.classList.add('nav-bar-item-box-hover');
  }

  onMouseLeave(event) {
    if (!this.active) {
      event.target.classList.remove('nav-bar-item-box-hover');
      event.target.classList.add('nav-bar-item-box');
    }
  }

  onSelect(event) {
    this.navItem.setActive(!this.navItem.getActive());
    this.navBarItemService.setNewActiveItem(this.navItem);
  }
}
