import {Component, OnInit, SimpleChanges} from '@angular/core';
import {NavBarItemService} from "../../services/nav-bar-item.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navBarItems = this.navBarItemService.getNavBarItems();

  constructor( private navBarItemService: NavBarItemService) { }

  ngOnInit(): void {
    this.navBarItemService.navBarItemsObservable.subscribe( navBarItems => {
      this.navBarItems = navBarItems;
    })
  }

}
