import { Component, OnInit } from '@angular/core';
import {AppConfigService} from "../../../services/app-config.service";
import {NavBarItem} from "../../../models/NavBarItem";
import {navBarComponentSelectorMap, navBarItemComponentSelectorMap} from "../../../models/maps/componentSelectorMaps";
import {ComponentWithNameComponent} from "../../interfaces/componentWithName.component";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {NavBarItemService} from "../../../services/nav-bar-item.service";

@Component({
  selector: 'app-set-app-navigation',
  templateUrl: './set-app-navigation.component.html',
  styleUrls: ['./set-app-navigation.component.scss']
})
export class SetAppNavigationComponent implements OnInit {
  config: NavBarItem[];
  dataSource: MatTableDataSource<NavBarItem>;
  columnsToDisplay = ['select', 'name', 'componentName', 'actions']
  outerComponents: Map<String, ComponentWithNameComponent> = navBarComponentSelectorMap;
  innerComponents: Map<String, ComponentWithNameComponent> = navBarItemComponentSelectorMap;

  selection = new SelectionModel<NavBarItem>(false, []);

  constructor(private appConfigService: AppConfigService,
              private navBarItemService: NavBarItemService) { }

  ngOnInit(): void {
    this.appConfigService.configObservable.subscribe(res => {
      this.config = res;
      this.dataSource = new MatTableDataSource<NavBarItem>(this.config);
    });
  }

  changeName(event, row){
    row.setName(event);
  }

  addNavBarItem(event) {
    this.config.push(new NavBarItem("Placeholder", [], null));
    this.dataSource = new MatTableDataSource<NavBarItem>(this.config);
  }

  deleteNavBarItem(event, row){
    const index: number = this.config.indexOf(row);
    if (index !== -1) {
      this.config.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource<NavBarItem>(this.config);
  }

  /** This saves the the local data from the diffrent vars into the config in this file, not saving global*/
  saveConfig(event) {
    this.config = this.dataSource.data;
  }

  /**
   * This applies the config to the navBarItem Service and sends the config to the backend
   * The configs gets applied to the app and changes cant be turned back!
   * */
  applyConfig(event) {
    this.navBarItemService.applyNewNavBar(this.config);
    console.log('Not supported yet!');
  }

}
