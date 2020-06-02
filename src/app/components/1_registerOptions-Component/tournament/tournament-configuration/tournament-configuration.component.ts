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
  selectedTournamentId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TournamentConfigurationComponent>,
              private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.name = this.data.name;
    this.tournaments = this.tournamentService.getTournaments();
    if(this.data.data && this.tournaments) {
      console.log(this.tournaments);
      this.selectedTournamentId = this.data.data;
      this.selectedTournament = this.tournaments.find( x => x.getId() === this.selectedTournamentId);
      console.log('tournament was set');
    }
    this.tournamentService.getTournamentObservable.subscribe( res => {
      this.tournaments = res;
      if(this.data.data && this.tournaments) {
        console.log(this.tournaments);
        this.selectedTournamentId = this.data.data;
        this.selectedTournament = this.tournaments.find( x => x.getId() === this.selectedTournamentId);
        console.log('tournament was set');
      }
      if(!this.data.data && this.tournaments) {
        console.log('tournament was not set');
      }
    });
  }

  public objectComparisonFunction = function( option, value ) : boolean {
    return option.id === value.id;
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
