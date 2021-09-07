import {Component, OnDestroy, OnInit} from '@angular/core';
import {LanpartyService} from '../../../services/dataServices/lanparty.service';
import {GamemodeService} from '../../../services/dataServices/gamemode.service';
import {TournamentTypeService} from '../../../services/dataServices/tournament-type.service';
import {TournamentService} from '../../../services/dataServices/tournament.service';
import {Lanparty} from '../../../models/Lanparty';
import {GameMode} from '../../../models/GameMode';
import {TournamentType} from '../../../models/TournamentType';
import {Tournament} from '../../../models/Tournament';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Subscription} from 'rxjs';
import {EventEmitterService} from '../../../services/event-emitter.service';

@Component({
  selector: 'app-tournament-settings',
  templateUrl: './tournament-settings.component.html',
  styleUrls: ['./tournament-settings.component.scss']
})
export class TournamentSettingsComponent implements OnInit, OnDestroy {

  constructor(private lanpartyService: LanpartyService,
              private gamemodeService: GamemodeService,
              private tournamentTypeService: TournamentTypeService,
              private tournamentService: TournamentService,
              private eventEmitter: EventEmitterService) { }

  lanparties: Lanparty[] = [];
  gameModes: GameMode[] = [];
  tournamentTypes: TournamentType[] = [];
  tournaments: Tournament[] = [];
  subscriptions: Subscription[] = [];

  /** Table parameters */
  dataSource: MatTableDataSource<Tournament>;
  columnsToDisplay = ['select', 'name', 'lanparty', 'gameMode', 'tournamentType', 'teamRegistration',
    'numberOfParticipants', 'published', 'started', 'startDate', 'endDate', 'registrationEndDate', 'finished', 'awards', 'actions'];
  selection = new SelectionModel<Lanparty>(false, []);

  ngOnInit(): void {
    this.loadData();
    this.setUpSubscriptions();
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  loadData(): void {
    this.lanparties = this.lanpartyService.getLanparties();
    this.gameModes = this.gamemodeService.getGameModes();
    this.tournamentTypes = this.tournamentTypeService.getTournamentTypes();
    this.tournaments = this.tournamentService.getTournaments();
    this.dataSource = new MatTableDataSource<Tournament>(this.tournaments);
  }

  setUpSubscriptions(): void {
    this.subscriptions.push(this.lanpartyService.getLanpartiesObservable.subscribe( lanparties => {
      if ( lanparties !== null) {
        this.lanparties = lanparties;
      }
    }));
    this.subscriptions.push(this.gamemodeService.getGameModeObservable.subscribe( gamemodes => {
      if ( gamemodes !== null) {
        this.gameModes = gamemodes;
      }
    }));
    this.subscriptions.push(this.tournamentTypeService.getTournamentTypeObservable.subscribe( tournamentTypes => {
      if ( tournamentTypes !== null) {
        this.tournamentTypes = tournamentTypes;
      }
    }));
    this.subscriptions.push(this.tournamentService.getTournamentObservable.subscribe( tournaments => {
      if ( tournaments !== null) {
        this.tournaments = tournaments;
        this.dataSource = new MatTableDataSource<Tournament>(this.tournaments);
      }
    }));
    /**
     * Be careful as this method builds on that the event at tournament service is executed fist
     */
    this.subscriptions.push(this.eventEmitter.tournamentDeletedObservable.subscribe(
      () => { this.dataSource = new MatTableDataSource<Tournament>(this.tournaments); }));
  }

  addTournament(event) {
    this.tournamentService.addTournament().subscribe();
  }

  changeName(event, row: Tournament) {
    row.setName(event);
  }

  public objectComparisonFunction( option, value ): boolean {
    return option.id === value.id;
  }

  deleteTournament(event, row: Tournament) {
    this.tournamentService.deleteTournament(row.id).subscribe();
  }

  createChallongeTournament(event, row: Tournament) {
    this.tournamentService.createChallongeTournament(row.id).subscribe();
  }

  createChallongeParticipants(event, row: Tournament) {
    this.tournamentService.createChallongeParticipants(row.id).subscribe();
  }

  clearChallongeParticipants(event, row: Tournament) {
    this.tournamentService.clearChallongeParticipants(row.id).subscribe();
  }

  startChallongeTournament(event, row: Tournament) {
    this.tournamentService.startChallongeParticipants(row.id).subscribe();
  }

  applyConfig(event) {
    this.tournamentService.saveTournament(this.tournaments);
  }
}
