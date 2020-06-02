import {Component, Input, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from "../../interfaces/componentWithName.component";
import {DataDisplayerComponent} from "../../interfaces/dataDisplayer.component";
import {SafeHtml} from "@angular/platform-browser";
import {Tournament} from "../../../models/Tournament";
import {Lanparty} from "../../../models/Lanparty";
import {TournamentService} from "../../../services/dataServices/tournament.service";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent extends ComponentWithNameComponent implements OnInit, DataDisplayerComponent {
  static componentName = "TournamentComponent";
  @Input() data: any;

  tournament: Tournament;
  lanparty: Lanparty;
  infosDisplayArray = [];

  constructor(private tournamentService: TournamentService) {
    super();
  }

  ngOnInit(): void {
    console.log(this.data);

    this.tournament = this.tournamentService.getTournament(this.data.data);
    this.setInfoArray();
    console.log(this.tournament);
    this.tournamentService.getTournamentObservable.subscribe( () => {
      this.tournament = this.tournamentService.getTournament(this.data.data);
      console.log(this.tournament);
      this.setInfoArray();
    });

  }

  setInfoArray() {
    if (this.tournament) {
      this.infosDisplayArray = [];
      this.infosDisplayArray.push(['Turnier Name', this.tournament.getName()]);
      this.infosDisplayArray.push(['Status', this.tournament.getStatus()]);
      this.infosDisplayArray.push(['Game', this.tournament.getGameMode().getGame()]);
      this.infosDisplayArray.push(['Elimination', this.tournament.getGameMode().getElimination()]);
      this.infosDisplayArray.push(['Turnier Type', this.tournament.getTournamentType().getName()]);
      this.infosDisplayArray.push(['Teamteilnahme', this.tournament.getTeamRegistration()]);
      this.infosDisplayArray.push(['Teamgrösse', this.tournament.getNumberOfParticipants()]);
      this.infosDisplayArray.push(['Startzeit', this.tournament.getStartDate()]);
    }
  }

}
