import {Component, Input, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from "../../interfaces/componentWithName.component";
import {DataDisplayerComponent} from "../../interfaces/dataDisplayer.component";
import {SafeHtml} from "@angular/platform-browser";
import {Tournament} from "../../../models/Tournament";
import {Lanparty} from "../../../models/Lanparty";

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

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(this.data);
    this.infosDisplayArray.push(['Turnier Name', this.data.data.name]);
    this.infosDisplayArray.push(['Game', this.data.data.gameMode.game]);
    this.infosDisplayArray.push(['Elimination', this.data.data.gameMode.elimination]);
    this.infosDisplayArray.push(['Turnier Type', this.data.data.tournamentType.name]);
    this.infosDisplayArray.push(['Teamteilnahme', this.data.data.teamRegistration]);
    this.infosDisplayArray.push(['Teamgrösse', this.data.data.numberOfParticipants]);
    this.infosDisplayArray.push(['Startzeit', this.data.data.startDate]);
  }

}
