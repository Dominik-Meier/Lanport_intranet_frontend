import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {GameMode} from '../../../models/GameMode';
import {GamemodeService} from '../../../services/dataServices/gamemode.service';
import {Subscription} from 'rxjs';
import {EventEmitterService} from '../../../services/event-emitter.service';
import {HtmlDisplayerConfigurationComponent} from '../../1_registerOptions-Component/html-displayer/html-displayer-configuration/html-displayer-configuration.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-gamemode-settings',
  templateUrl: './gamemode-settings.component.html',
  styleUrls: ['./gamemode-settings.component.scss']
})
export class GamemodeSettingsComponent implements OnInit, OnDestroy {
  gameModes: GameMode[];
  oldGameModes: GameMode[];
  subscriptions: Subscription[] = [];

  /** Table parameters */
  dataSource: MatTableDataSource<GameMode>;
  columnsToDisplay = ['name', 'game', 'elimination', 'teamSize', 'rules', 'actions'];

  constructor(private gameModeService: GamemodeService,
              private eventEmitter: EventEmitterService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions.push(this.gameModeService.getGameModeObservable.subscribe( gamemodes => {
      this.setGameModes(gamemodes);
    }));
    this.subscriptions.push(this.eventEmitter.gameModesUpdatedObservable.subscribe(
      () => this.dataSource = new MatTableDataSource<GameMode>(this.gameModes)));
    this.subscriptions.push(this.eventEmitter.gameModeDeletedObservable.subscribe(
      () => this.dataSource = new MatTableDataSource<GameMode>(this.gameModes)));
    this.setGameModes(this.gameModeService.getGameModes());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  setGameModes(gameModes: GameMode[]) {
    this.gameModes = gameModes;
    this.oldGameModes = gameModes;
    this.dataSource = new MatTableDataSource<GameMode>(this.gameModes);
  }

  addGameMode(event) {
    this.gameModeService.createGameMode().subscribe();
  }

  changeName(event, row: GameMode) {
    row.setName(event);
  }

  changeGame(event, row: GameMode) {
    row.setGame(event);
  }

  changeElimination(event, row: GameMode) {
    row.setElimination(event);
  }

  changeTeamSize(event, row: GameMode) {
    row.setTeamSize(event);
  }

  deleteGameMode(event, row) {
    this.gameModeService.deleteGameMode(row.id).subscribe();
  }

  applyConfig(event) {
    this.gameModeService.saveGameModes(this.gameModes);
  }

  changeRules(event, row) {
    const dialogRef = this.dialog.open( HtmlDisplayerConfigurationComponent, {
      width: '50vw',
      data: {data: row.rules, name: row.name}
    });

    dialogRef.afterClosed().subscribe( result => {
      row.rules = result;
    });
  }
}
