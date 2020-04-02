import {Component, Input, OnInit} from '@angular/core';
import {RegisterItemComponent} from "../interfaces/registerItem.component";
import {ComponentWithNameComponent} from "../interfaces/componentWithName.component";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent extends ComponentWithNameComponent implements OnInit, RegisterItemComponent {
  static componentName = 'TournamentComponent';
  @Input() registerOptions: any;
  data: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
