import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TournamentService} from '../../../../services/dataServices/tournament.service';
import {Tournament} from '../../../../models/Tournament';
import {ComponentWithNameComponent} from '../../../interfaces/componentWithName.component';

@Component({
  selector: 'app-tournament-configuration',
  templateUrl: './tournament-configuration.component.html',
  styleUrls: ['./tournament-configuration.component.scss']
})
export class TournamentConfigurationComponent extends ComponentWithNameComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TournamentConfigurationComponent>,
              private tournamentService: TournamentService) {
    super();
  }

  static componentName = 'TournamentComponent';
  tournaments: Tournament[] = [];
  name: string;
  selectedTournament: Tournament;
  selectedTournamentId: number;

  ngOnInit(): void {
    this.name = this.data.name;
    this.tournaments = this.tournamentService.getTournaments();
    if (this.data.data && this.tournaments) {
      this.setTournament();
    }
    this.tournamentService.getTournamentObservable.subscribe( res => {
      this.tournaments = res;
      if (this.data.data && this.tournaments) {
        this.setTournament();
      }
    });
  }

  public tournamentComparator(option, value): boolean {
    return option.id.toString() === value.id.toString();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setTournament() {
    this.selectedTournamentId = this.data.data;
    this.selectedTournament = this.tournaments.find( x => x.getId() === this.selectedTournamentId);
  }
}
