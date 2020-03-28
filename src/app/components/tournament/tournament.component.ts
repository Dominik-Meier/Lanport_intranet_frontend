import {Component, Input, OnInit} from '@angular/core';
import {RegisterItemComponent} from "../interfaces/registerItem.component";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit, RegisterItemComponent {
  @Input() registerOptions: any;

  constructor() { }

  ngOnInit(): void {
  }

}
