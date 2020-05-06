import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Lanparty} from "../../../models/Lanparty";
import {FormControl} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {GameMode} from "../../../models/GameMode";
import {GamemodeService} from "../../../services/dataServices/gamemode.service";

@Component({
  selector: 'app-gamemode-settings',
  templateUrl: './gamemode-settings.component.html',
  styleUrls: ['./gamemode-settings.component.scss']
})
export class GamemodeSettingsComponent implements OnInit {
  gameModes: GameMode[];
  oldGameModes: GameMode[];

  /** Table parameters */
  dataSource: MatTableDataSource<GameMode>;
  columnsToDisplay = ['name', 'game', 'teamSize', 'rules', 'actions'];

  constructor(private gameModeService: GamemodeService) { }

  ngOnInit(): void {
    this.gameModeService.getGameModeObservable.subscribe( gamemodes => {
      this.setGameModes(gamemodes);
    });
    this.setGameModes(this.gameModeService.getGameModes());
  }

  setGameModes(gameModes: GameMode[]) {
    this.gameModes = gameModes;
    this.oldGameModes = gameModes;
    this.dataSource = new MatTableDataSource<GameMode>(this.gameModes);
    console.log('gameModes: ', gameModes);
  }

  addGameMode(event) {
    this.gameModes.push( new GameMode(null, 'Placeholder', 'Game X', 0, 'not supported yet'));
    this.dataSource = new MatTableDataSource<GameMode>(this.gameModes);
  }

  changeName(event, row: GameMode) {
    row.setName(event);
  }

  changeGame(event, row: GameMode) {
    row.setGame(event);
  }


  changeTeamSize(event, row: GameMode) {
    row.setTeamSize(event);
  }

  changeRules(event, row: GameMode) {
    row.setRules(event);
  }

  //TODO maybe creat a deleted flag not deleting acutaly?
  deleteGameMode(event, row) {
    console.log('Not supported yet!');
  }

  applyConfig(event) {
    this.gameModeService.saveGameModes(this.gameModes);
  }
}
