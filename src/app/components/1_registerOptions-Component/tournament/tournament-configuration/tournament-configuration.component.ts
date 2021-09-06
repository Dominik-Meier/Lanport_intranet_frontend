import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TournamentService} from '../../../../services/dataServices/tournament.service';
import {Tournament} from '../../../../models/Tournament';
import {ComponentWithNameComponent} from '../../../interfaces/componentWithName.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tournament-configuration',
  templateUrl: './tournament-configuration.component.html',
  styleUrls: ['./tournament-configuration.component.scss']
})
export class TournamentConfigurationComponent extends ComponentWithNameComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TournamentConfigurationComponent>,
              private tournamentService: TournamentService) {
    super();
  }

  static componentName = 'TournamentComponent';
  private subscriptions: Subscription[] = [];
  tournaments: Tournament[] = this.tournamentService.getTournaments();
  name: string;
  selectedTournament: Tournament;
  selectedTournamentId: number;

  ngOnInit(): void {
    this.subscriptions.push(this.tournamentService.getTournamentObservable.subscribe( res => {
      this.tournaments = res;
      this.setTournament();
    }));
    this.name = this.data.name;
    this.setTournament();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public tournamentComparator(option, value): boolean {
    return option.id.toString() === value.id.toString();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setTournament() {
    if (this.data.data && this.tournaments) {
      this.selectedTournamentId = this.data.data;
      this.selectedTournament = this.tournaments.find(x => x.getId().toString() === this.selectedTournamentId.toString());
    }
  }
}
