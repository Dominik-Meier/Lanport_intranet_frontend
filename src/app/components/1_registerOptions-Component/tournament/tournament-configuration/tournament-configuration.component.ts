import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TournamentService} from "../../../../services/dataServices/tournament.service";
import {Tournament} from "../../../../models/Tournament";

@Component({
  selector: 'app-tournament-configuration',
  templateUrl: './tournament-configuration.component.html',
  styleUrls: ['./tournament-configuration.component.scss']
})
export class TournamentConfigurationComponent implements OnInit {
  tournaments: Tournament[] = [];
  name: string;
  selectedTournament: Tournament;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TournamentConfigurationComponent>,
              private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.name = this.data.name;
    this.selectedTournament = this.data.data;
    this.tournaments = this.tournamentService.getTournaments();
    this.tournamentService.getTournamentObservable.subscribe( res => {
      this.tournaments = res;
    });
  }

  public objectComparisonFunction = function( option, value ) : boolean {
    return option.id === value.id;
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
