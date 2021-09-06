import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LanpartyService} from '../../../services/dataServices/lanparty.service';
import {Lanparty} from '../../../models/Lanparty';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {EventEmitterService} from '../../../services/event-emitter.service';

@Component({
  selector: 'app-lanparty-settings',
  templateUrl: './lanparty-settings.component.html',
  styleUrls: ['./lanparty-settings.component.scss']
})
export class LanpartySettingsComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  lanparties: Lanparty[];
  oldLanparties: Lanparty[];
  subscriptions: Subscription[] = [];

  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  /** Table parameters */
  dataSource: MatTableDataSource<Lanparty>;
  columnsToDisplay = ['select', 'name', 'active', 'startDate', 'endDate', 'actions'];
  selection = new SelectionModel<Lanparty>(false, []);

  constructor(private lanpartyService: LanpartyService, private eventEmitter: EventEmitterService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.lanpartyService.getLanpartiesObservable.subscribe( lans => {
      this.setLanparties(lans);
    }));
    this.setLanparties(this.lanpartyService.getLanparties());
    /**
     * Be careful as this method builds on that the event at tournament service is executed fist
     */
    this.subscriptions.push(this.eventEmitter.lanpartyDeletedObservable.subscribe(
      () => { this.dataSource = new MatTableDataSource<Lanparty>(this.lanparties); }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  setLanparties(lans: Lanparty[]) {
    this.lanparties = lans;
    this.oldLanparties = lans;
    this.dataSource = new MatTableDataSource<Lanparty>(this.lanparties);
  }

  addLanparty(event) {
    this.lanpartyService.createLanparty().subscribe();
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

  deleteLanparty(event, row) {
    this.lanpartyService.deleteLanparty(row).subscribe();
  }

  applyConfig(event) {
    this.lanpartyService.saveLanparties(this.lanparties);
  }
}
