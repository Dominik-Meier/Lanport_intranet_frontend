import {Component, OnDestroy, OnInit} from '@angular/core';import {MatTableDataSource} from "@angular/material/table";
import {TournamentType} from "../../../models/TournamentType";
import {TournamentTypeService} from "../../../services/dataServices/tournament-type.service";
import {Subscription} from "rxjs";
import {EventEmitterService} from "../../../services/event-emitter.service";

@Component({
  selector: 'app-tournament-type-settings',
  templateUrl: './tournament-type-settings.component.html',
  styleUrls: ['./tournament-type-settings.component.scss']
})
export class TournamentTypeSettingsComponent implements OnInit, OnDestroy {
  tournamentTypes: TournamentType[];
  oldTournamentTypes: TournamentType[];
  subscriptions: Subscription[] = [];

  /** Table parameters */
  dataSource: MatTableDataSource<TournamentType>;
  columnsToDisplay = ['name', 'actions'];

  constructor(private tournamentTypeService: TournamentTypeService,
              private eventEmitter: EventEmitterService) { }

  ngOnInit(): void {
    this.setTournamentTypes(this.tournamentTypeService.getTournamentTypes());
    this.subscriptions.push(this.tournamentTypeService.getTournamentTypeObservable.subscribe( tournamentTypes => {
      this.setTournamentTypes(tournamentTypes);
    }));
    this.subscriptions.push(this.eventEmitter.tournamentTypeDeletedObservable.subscribe(() =>
      this.dataSource = new MatTableDataSource<TournamentType>(this.tournamentTypes)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  setTournamentTypes(tournamentTypes: TournamentType[]) {
    this.tournamentTypes = tournamentTypes;
    this.oldTournamentTypes = tournamentTypes;
    this.dataSource = new MatTableDataSource<TournamentType>(this.tournamentTypes);
  }

  addTournamentType(event) {
    this.tournamentTypes.push( new TournamentType(null, 'Placeholder'));
    this.dataSource = new MatTableDataSource<TournamentType>(this.tournamentTypes);
  }

  changeName(event, row: TournamentType) {
    row.setName(event);
  }

  deleteTournamentType(event, row) {
    this.tournamentTypeService.deleteTournamentType(row.id).subscribe();
  }

  applyConfig(event) {
    this.tournamentTypeService.saveTournamentTypes(this.tournamentTypes);
  }
}
