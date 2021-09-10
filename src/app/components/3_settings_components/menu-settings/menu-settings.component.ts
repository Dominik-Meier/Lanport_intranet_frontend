import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MenuService} from '../../../services/dataServices/menu.service';
import {Menu} from '../../../models/Menu';
import {CreateMenuComponent} from '../../create-menu/create-menu.component';

@Component({
  selector: 'app-menu-settings',
  templateUrl: './menu-settings.component.html',
  styleUrls: ['./menu-settings.component.scss']
})
export class MenuSettingsComponent implements OnInit, OnDestroy {
  menus: Menu[] = [];
  dataSource: MatTableDataSource<Menu>;
  subscriptions: Subscription[] = [];
  dialogRef: MatDialogRef<any>;
  currentRow: any;

  columnsToDisplay = ['name', 'actions'];
  constructor(private menuService: MenuService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.menus = this.menuService.menus;
    this.updateData();
    this.subscriptions.push(this.menuService.menusObservable.subscribe( menus => {
      this.menus = menus;
      this.updateData();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  updateData() {
    if (this.dialogRef && this.currentRow) {
      this.dialogRef.componentInstance.data = this.currentRow;
    }
    this.dataSource = new MatTableDataSource<Menu>(this.menus);
  }

  newMenu() {
    this.menuService.createMenu().subscribe();
  }

  updateMenu(row) {
    const dialogRef = this.dialog.open( CreateMenuComponent, {
      width: '50vw',
      minWidth: '350px',
      data: {menu: row}
    });
    dialogRef.afterClosed().subscribe(updatedMenu => {
      if (updatedMenu) {
        this.menuService.updateMenu(updatedMenu).subscribe();
      }
    });
  }

  deleteMenu(row) {
    this.menuService.deleteMenu(row.id).subscribe();
  }
}
