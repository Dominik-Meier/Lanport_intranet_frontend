import {Component, Input, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from "../../interfaces/componentWithName.component";
import {DataDisplyerComponent} from "../../interfaces/dataDisplayer.component";
import {SafeHtml} from "@angular/platform-browser";
import {Tournament} from "../../../models/Tournament";
import {Lanparty} from "../../../models/Lanparty";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent extends ComponentWithNameComponent implements OnInit, DataDisplyerComponent {
  static componentName = "TournamentComponent";
  @Input() data: any;

  tournament: Tournament;
  lanparty: Lanparty;

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
