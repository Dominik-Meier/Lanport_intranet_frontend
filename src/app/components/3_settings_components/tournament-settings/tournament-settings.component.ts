import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-tournament-settings',
  templateUrl: './tournament-settings.component.html',
  styleUrls: ['./tournament-settings.component.scss']
})
export class TournamentSettingsComponent implements OnInit {

  constructor(private lanpartyService: LanpartyService,
              private gamemodeService: GamemodeService,
              private tournamentTypeService: TournamentTypeService,
              private tournamentService: TournamentService) { }

  lanparties: Lanparty[] = [];
  gameModes: GameMode[] = [];
  tournamentTypes: TournamentType[] = [];
  tournaments: Tournament[] = [];

  /** Table parameters */
  dataSource: MatTableDataSource<Tournament>;
  columnsToDisplay = ['select', 'name', 'lanparty', 'gameMode', 'tournamentType', 'teamRegistration',
    'numberOfParticipants', 'published', 'started', 'startDate', 'endDate', 'registrationEndDate', 'finished', 'awards'];
  selection = new SelectionModel<Lanparty>(false, []);

  ngOnInit(): void {
    this.loadData();
    this.setUpSubscriptions();
  }

  loadData(): void {
    this.lanparties = this.lanpartyService.getLanparties();
    this.gameModes = this.gamemodeService.getGameModes();
    this.tournamentTypes = this.tournamentTypeService.getTournamentTypes();
    this.tournaments = this.tournamentService.getTournaments();
    this.dataSource = new MatTableDataSource<Tournament>(this.tournaments);
  }

  setUpSubscriptions(): void {
    this.lanpartyService.getLanpartiesObservable.subscribe( lanparties => {
      if ( lanparties !== null) {
        this.lanparties = lanparties;
      }
    });
    this.gamemodeService.getGameModeObservable.subscribe( gamemodes => {
      if ( gamemodes !== null) {
        this.gameModes = gamemodes;
      }
    });
    this.tournamentTypeService.getTournamentTypeObservable.subscribe( tournamentTypes => {
      if ( tournamentTypes !== null) {
        this.tournamentTypes = tournamentTypes;
      }
    });
    this.tournamentService.getTournamentObservable.subscribe( tournaments => {
      if ( tournaments !== null) {
        this.tournaments = tournaments;
        this.dataSource = new MatTableDataSource<Tournament>(this.tournaments);
      }
    });
  }

  addTournament(event) {
    this.tournamentService.addTournament().subscribe();
  }

  changeName(event, row: Tournament) {
    row.setName(event);
  }

  public objectComparisonFunction = function( option, value ): boolean {
    return option.id === value.id;
  };

  deleteTournament(event, row: Tournament) {
    // TODO
  }

  applyConfig(event) {
    this.tournamentService.saveTournament(this.tournaments);
  }
}
