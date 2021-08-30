import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {GameMode} from '../../../models/GameMode';
import {GamemodeService} from '../../../services/dataServices/gamemode.service';
import {Subscription} from 'rxjs';
import {EventEmitterService} from '../../../services/event-emitter.service';

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
              private eventEmitter: EventEmitterService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.gameModeService.getGameModeObservable.subscribe( gamemodes => {
      this.setGameModes(gamemodes);
    }));
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
    // TODO new way over api first
    this.gameModes.push( new GameMode(null, 'Placeholder', 'Game X', 'Elimination', 0, 'not supported yet'));
    this.dataSource = new MatTableDataSource<GameMode>(this.gameModes);
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

  changeRules(event, row: GameMode) {
    row.setRules(event);
  }

  deleteGameMode(event, row) {
    this.gameModeService.deleteGameMode(row.id).subscribe();
  }

  applyConfig(event) {
    this.gameModeService.saveGameModes(this.gameModes);
  }
}
