import {Component, Input, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from "../../../interfaces/componentWithName.component";
import {DataDisplyerComponent} from "../../../interfaces/dataDisplayer.component";
import {NavBarItem} from "../../../../models/NavBarItem";
import {MatTableDataSource} from "@angular/material/table";
import {
  navBarComponentSelectorMap,
  navBarItemComponentSelectorMap
} from "../../../../models/maps/componentSelectorMaps";
import {SelectionModel} from "@angular/cdk/collections";
import {RegisterOptionItem} from "../../../../models/registerOptionItem";
import {NavBarItemService} from "../../../../services/nav-bar-item.service";
import { MatDialog, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import {HtmlDisplayerConfigurationComponent} from "../../../1_registerOptions-Component/html-displayer/html-displayer-configuration/html-displayer-configuration.component";

@Component({
  selector: 'app-dynamic-register-options-configuration',
  templateUrl: './dynamic-register-options-configuration.component.html',
  styleUrls: ['./dynamic-register-options-configuration.component.scss']
})
export class DynamicRegisterOptionsConfigurationComponent extends ComponentWithNameComponent implements OnInit, DataDisplyerComponent   {
  static componentName = 'DynamicRegisterOptionsConfigurationComponent';
  @Input() data: any;
  oldNavBarItem: NavBarItem = null;
  navBarItem: NavBarItem = null;

  dataSource: MatTableDataSource<RegisterOptionItem>;
  columnsToDisplay = ['select', 'name', 'componentName', 'data', 'actions']
  outerComponents: Map<String, ComponentWithNameComponent> = navBarComponentSelectorMap;
  innerComponents: Map<String, ComponentWithNameComponent> = navBarItemComponentSelectorMap;

  // outerConfigurationsComponents: Map<String, ComponentWithNameComponent> = navBarComponentConfigurationSelectorMap;
  // innerConfigurationsComponents: Map<String, ComponentWithNameComponent> = navBarItemComponentConfigurationSelectorMap;

  selection = new SelectionModel<RegisterOptionItem>(false, []);

  constructor(private navBarItemService: NavBarItemService,
              public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    (this.data instanceof NavBarItem) ? this.navBarItem = this.data : null;
    if (this.navBarItem) {
      this.oldNavBarItem = this.navBarItem;
      this.dataSource = new MatTableDataSource<RegisterOptionItem>(this.navBarItem.getOptions());
    }
  }

  addRegisterOption(event) {
    this.navBarItem.addOption(new RegisterOptionItem('Placeholder', null, null));
    this.dataSource = new MatTableDataSource<RegisterOptionItem>(this.navBarItem.getOptions());
  }

  applyConfig(event) {
    console.log(event);
    this.navBarItemService.applyNewNavBarItem(this.navBarItem, this.oldNavBarItem);
    console.log('applied new config!');
  }

  changeName(event, row) {
    row.setName(event);
  }

  selectionChanged(event, row) {
    row.data = null;
    console.log('changed selection, data removed!');
  }

  deleteItem(event, row) {
    this.navBarItem.removeOption(row);
    console.log('changedOptions: ', this.navBarItem);
    this.dataSource = new MatTableDataSource<RegisterOptionItem>(this.navBarItem.getOptions());
  }

  openDialog(row): void {
    //TODO link component
    const dialogRef = this.dialog.open( HtmlDisplayerConfigurationComponent, {
      width: '50vw',
      data: {data: row.data}
    });

    dialogRef.afterClosed().subscribe( result => {
      //TODO what to do with the result
      console.log(result);
    })
  }
}
