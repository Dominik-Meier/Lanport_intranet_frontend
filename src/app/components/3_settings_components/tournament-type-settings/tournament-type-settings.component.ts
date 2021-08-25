import { Component, OnInit } from '@angular/core';import {MatTableDataSource} from "@angular/material/table";
import {TournamentType} from "../../../models/TournamentType";
import {TournamentTypeService} from "../../../services/dataServices/tournament-type.service";

@Component({
  selector: 'app-tournament-type-settings',
  templateUrl: './tournament-type-settings.component.html',
  styleUrls: ['./tournament-type-settings.component.scss']
})
export class TournamentTypeSettingsComponent implements OnInit {
  tournamentTypes: TournamentType[];
  oldTournamentTypes: TournamentType[];

  /** Table parameters */
  dataSource: MatTableDataSource<TournamentType>;
  columnsToDisplay = ['name', 'actions'];

  constructor(private tournamentTypeService: TournamentTypeService) { }

  ngOnInit(): void {
    this.tournamentTypeService.getTournamentTypeObservable.subscribe( tournamentTypes => {
      this.setTournamentTypes(tournamentTypes);
    });
    this.setTournamentTypes(this.tournamentTypeService.getTournamentTypes());
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

  //TODO maybe creat a deleted flag not deleting acutaly?
  deleteTournamentType(event, row) {
  }

  applyConfig(event) {
    this.tournamentTypeService.saveTournamentTypes(this.tournamentTypes);
  }
}
