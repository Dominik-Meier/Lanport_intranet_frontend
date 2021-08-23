import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NavBarItem} from '../../../models/NavBarItem';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() items: NavBarItem;
  @Output() itemSelected = new EventEmitter<NavBarItem>();
  @ViewChild('childMenu', {static: true}) public childMenu;

  constructor() { }

  ngOnInit(): void { }

  callItemSelected(item) {
    this.itemSelected.emit(item);
  }
}
