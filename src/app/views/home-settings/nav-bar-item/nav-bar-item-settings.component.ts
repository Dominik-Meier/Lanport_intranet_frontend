import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {NavBarItemSettings} from "../../../models/NavBarItemSettings";
import {AdminPageService} from "../../../services/admin-page.service";


@Component({
  selector: 'app-nav-bar-item-settings',
  templateUrl: './nav-bar-item-settings.component.html',
  styleUrls: ['./nav-bar-item-settings.component.scss']
})
export class NavBarItemSettingsComponent implements OnChanges {
  @ViewChild('navbaritemdivcontainer') private element: ElementRef;
  @Input() navItem: NavBarItemSettings;
  @Input() active: boolean;

  constructor(private adminPageService: AdminPageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.navItem.getActive()) {
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
    this.adminPageService.setNewActiveItem(this.navItem);
  }
}
