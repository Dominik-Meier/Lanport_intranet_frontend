import {Component, Input, OnInit} from '@angular/core';
import {RegisterItemComponent} from "../interfaces/registerItem.component";
import {RegisterOptionItem} from "../../models/registerOptionItem";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, RegisterItemComponent {
  @Input() registerOptions: RegisterOptionItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
