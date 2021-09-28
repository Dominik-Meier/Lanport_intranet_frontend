import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AppConfigService} from '../../../services/app-config.service';
import {ComponentWithNameComponent} from '../../interfaces/componentWithName.component';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {navBarComponentSelectorMap, navBarItemComponentConfigurationSelectorMap} from '../../../util/mapperFunctions';
import {Subscription} from 'rxjs';
import {NavBarItem} from '../../../models/NavBarItem';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-set-app-navigation',
  templateUrl: './set-app-navigation.component.html',
  styleUrls: ['./set-app-navigation.component.scss']
})
export class SetAppNavigationComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  @Input() parentAppNavItem: number;
  @Input() config: NavBarItem[];
  @Output() saveConfig = new EventEmitter<NavBarItem[]>();
  public activeNavItem: NavBarItem;
  private subscriptions: Subscription[] = [];
  dataSource: MatTableDataSource<NavBarItem>;
  columnsToDisplay = ['select', 'name', 'componentName', 'data', 'enabledAtIntranet', 'activeForBeamerPresentation', 'beamerTimer', 'actions'];
  selectableComponents = Array.from(navBarComponentSelectorMap.keys());
  selectableConfigurationComponents: Map<string, ComponentWithNameComponent> = navBarItemComponentConfigurationSelectorMap;


  selection = new SelectionModel<NavBarItem>(false, []);

  constructor(private appConfigService: AppConfigService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions.push(this.selection.changed.asObservable().subscribe( event => {
      if (event.added) {
        this.activeNavItem = event.added[0];
      }
    }));
    this.dataSource = new MatTableDataSource<NavBarItem>(this.config);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  setEnabledAtIntranet(event: MatCheckboxChange, row: NavBarItem) {
    row.setActiveForIntranet(event.checked);
  }

  setActiveForBeamerPresentation(event: MatCheckboxChange, row: NavBarItem) {
    row.setActiveForBeamerPresentation(event.checked);
  }

  changeName(event, row){
    row.setName(event);
  }

  addNavBarItem(event) {
    const newNavBarItem = new NavBarItem(null, 'Placeholder', null, this.parentAppNavItem, [],
      null, false, false, null, false, 5000);
    this.appConfigService.addAppComponent(newNavBarItem).subscribe();
  }

  deleteNavBarItem(event, row){
    const index: number = this.config.indexOf(row);
    if (row.id) {
      this.appConfigService.deleteAppComponent(row).subscribe();
    } else {
      if (index > -1) {
        this.config.splice(index, 1);
        this.dataSource = new MatTableDataSource<NavBarItem>(this.config);
      }
    }
  }

  /**
   * This applies the config to the navBarItem Service and sends the config to the backend
   * The configs gets applied to the app and changes cant be turned back!
   */
  applyConfig(event) {
    this.saveConfig.emit(this.config);
  }

  openDialog(row: NavBarItem): void {
    const componentToLoad = this.selectableConfigurationComponents.get(row.usedComponent);
    // @ts-ignore
    const dialogRef = this.dialog.open( componentToLoad, {
      width: '50vw',
      data: {data: row.data, name: row.name}
    });

    dialogRef.afterClosed().subscribe( result => {
      row.data = result;
    });
  }
}
