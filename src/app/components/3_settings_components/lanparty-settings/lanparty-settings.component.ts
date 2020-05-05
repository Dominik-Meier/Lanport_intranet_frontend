import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LanpartyService} from "../../../services/dataServices/lanparty.service";
import {Lanparty} from "../../../models/Lanparty";
import {MatTableDataSource} from "@angular/material/table";
import {NavBarItem} from "../../../models/NavBarItem";
import {SelectionModel} from "@angular/cdk/collections";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-lanparty-settings',
  templateUrl: './lanparty-settings.component.html',
  styleUrls: ['./lanparty-settings.component.scss']
})
export class LanpartySettingsComponent implements OnInit {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  lanparties: Lanparty[];
  oldLanparties: Lanparty[];

  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  /** Table parameters */
  dataSource: MatTableDataSource<Lanparty>;
  columnsToDisplay = ['select', 'name', 'active', 'startDate', 'endDate', 'actions']
  selection = new SelectionModel<Lanparty>(false, []);

  constructor(private lanpartyService: LanpartyService) { }

  ngOnInit(): void {
    this.lanpartyService.getLanpartiesObservable.subscribe( lans => {
      this.setLanparties(lans);
    });
    this.setLanparties(this.lanpartyService.getLanparties());
  }

  setLanparties(lans: Lanparty[]) {
    this.lanparties = lans;
    this.oldLanparties = lans;
    this.dataSource = new MatTableDataSource<Lanparty>(this.lanparties);
    console.log('lanparty: ', lans);
  }

  startDateChanged(event, row) {
    console.log('lanparties: ', this.lanparties);
  }

  endDateChanged(event, row) {
    console.log('lanparties: ', this.lanparties);
  }

  addLanparty(event) {
    this.lanpartyService.addLanparty( new Lanparty('Placeholder', false, new Date( Date.now()), new Date( Date.now()))).subscribe( lan => {
      this.lanparties.push(lan);
      this.dataSource = new MatTableDataSource<Lanparty>(this.lanparties);
    });
  }

  applyConfig(event) {
    for( const lanparty of this.lanparties) {

    }
  }

  changeName(event, row) {

  }

  //TODO maybe creat a deleted flag not deleting acutaly?
  deleteLanparty(event, row) {

  }

}
