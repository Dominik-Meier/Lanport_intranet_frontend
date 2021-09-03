import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LanpartyService} from '../../../services/dataServices/lanparty.service';
import {Lanparty} from '../../../models/Lanparty';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';

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
  columnsToDisplay = ['select', 'name', 'active', 'startDate', 'endDate', 'actions'];
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
  }

  addLanparty(event) {
    this.lanparties.push( new Lanparty(null, 'Placeholder', false, new Date( Date.now()), new Date( Date.now())));
    this.dataSource = new MatTableDataSource<Lanparty>(this.lanparties);
  }

  changeName(event, row: Lanparty) {
    row.setName(event);
  }

  /**
   * Set active flag of a lanaprty, only one lanaprty can be active at a time!
   */
  changeActive(event, row: Lanparty) {
    this.lanparties.forEach( party => { party.setActive(false); });
    row.setActive(event);
  }

  startDateChanged(event, row: Lanparty) {
    row.setStartDate(event.value);
  }

  endDateChanged(event, row: Lanparty) {
    row.setEndDate(event.value);
  }

  // TODO maybe creat a deleted flag not deleting acutaly?
  deleteLanparty(event, row) {
  }

  applyConfig(event) {
    this.lanpartyService.saveLanparties(this.lanparties);
  }
}
