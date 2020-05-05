import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AppConfigService} from "../../../services/app-config.service";
import {NavBarItem} from "../../../models/NavBarItem";
import {navBarComponentSelectorMap, navBarItemComponentSelectorMap} from "../../../models/maps/componentSelectorMaps";
import {ComponentWithNameComponent} from "../../interfaces/componentWithName.component";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {NavBarItemService} from "../../../services/nav-bar-item.service";
import {HtmlDisplayerComponent} from "../../1_registerOptions-Component/html-displayer/html-displayer.component";
import {
  navBarComponentConfigurationSelectorMap,
  navBarItemComponentConfigurationSelectorMap
} from "../../../models/maps/componentConfigurationSelectorMaps";
import {DataDisplyerComponent} from "../../interfaces/dataDisplayer.component";

@Component({
  selector: 'app-set-app-navigation',
  templateUrl: './set-app-navigation.component.html',
  styleUrls: ['./set-app-navigation.component.scss']
})
export class SetAppNavigationComponent implements OnInit {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  config: NavBarItem[];
  dataSource: MatTableDataSource<NavBarItem>;
  columnsToDisplay = ['select', 'name', 'componentName', 'actions']
  outerComponents: Map<String, ComponentWithNameComponent> = navBarComponentSelectorMap;
  innerComponents: Map<String, ComponentWithNameComponent> = navBarItemComponentSelectorMap;

  outerConfigurationsComponents: Map<String, ComponentWithNameComponent> = navBarComponentConfigurationSelectorMap;
  innerConfigurationsComponents: Map<String, ComponentWithNameComponent> = navBarItemComponentConfigurationSelectorMap;

  selection = new SelectionModel<NavBarItem>(false, []);

  constructor(private appConfigService: AppConfigService,
              private navBarItemService: NavBarItemService,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.appConfigService.configObservable.subscribe(res => {
      this.config = res;
      this.dataSource = new MatTableDataSource<NavBarItem>(this.config);
    });
    this.selection.changed.asObservable().subscribe( event => {
      if(event.added) {
        this.loadSubComponent(event.added[0])
      }
    })
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

  //TODO there is some times an error about the loaded component
  loadSubComponent(navBarItem: NavBarItem) {
    this.dynamicElementInsertionPoint.clear();
    if(navBarItem.getComponent()) {
      const componentToResolve = this.outerConfigurationsComponents.get(navBarItem.getComponent().componentName);

      //TODO is working but maybe check the error
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToResolve);
      const componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
      (<DataDisplyerComponent>componentRef.instance).data = navBarItem;
    }
  }

}
