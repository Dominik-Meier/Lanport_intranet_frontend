import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from '../../interfaces/componentWithName.component';
import {DataDisplayerComponent} from '../../interfaces/dataDisplayer.component';
import {Tournament} from '../../../models/Tournament';
import {TournamentService} from '../../../services/dataServices/tournament.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateTeamComponent} from '../../create-team/create-team.component';
import {Team} from '../../../models/Team';
import {TeamService} from '../../../services/dataServices/team.service';
import {TeamMemberService} from '../../../services/dataServices/team-member.service';
import {AuthService} from '../../../services/auth-service.service';
import {TournamentParticipant} from '../../../models/TournamentParticipant';
import {TournamentParticipantService} from '../../../services/dataServices/tournamentParticipant.service';
import {formatDate} from '@angular/common';
import {DisplayUserComponent} from '../../display-user/display-user.component';
import {ShowTeamComponent} from '../../showTeam/show-team/show-team.component';
import {EventEmitterService} from '../../../services/event-emitter.service';
import {TeamMember} from '../../../models/TeamMember';
import {Subscription} from 'rxjs';
import {tournamentDiffer} from '../../../util/tournamentUpdaterFunctions';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent extends ComponentWithNameComponent implements OnInit, DataDisplayerComponent, OnDestroy {
  static componentName = 'TournamentComponent';
  @Input() data: any;

  tournamentId: number;
  tournament: Tournament;
  infosDisplayArray = [];
  teams: Team[] = [];
  tournamentParticipants: TournamentParticipant[] = [];
  subscriptions: Subscription[] = [];

  constructor(private tournamentService: TournamentService,
              private teamService: TeamService,
              private teamMemberService: TeamMemberService,
              private authService: AuthService,
              private tournamentParticipantService: TournamentParticipantService,
              private eventEmitter: EventEmitterService,
              public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.tournamentId = this.data.data;
    this.tournament = this.tournamentService.getTournament(this.tournamentId);
    if (this.tournament) {
      this.setInfoArray();
      this.loadTeams();
      this.loadTournamentParticipant();
    }

    this.subscriptions.push(this.tournamentService.getTournamentObservable.subscribe( tournament => this.loadTournament(tournament)));
    this.subscriptions.push(this.eventEmitter.tournamentParticipantJoinedObservable.subscribe( tp => this.joinTournamentAction(tp)));
    this.subscriptions.push(this.eventEmitter.tournamentParticipantLeftObservable.subscribe( tp => this.leaveTournamentAction(tp)));
    this.subscriptions.push(this.eventEmitter.createTeamSubjectObservable.subscribe(team => this.createTeamAction(team)));
    this.subscriptions.push(this.eventEmitter.teamMemberJoinedObservable.subscribe(tm => this.teamMemberJoinedAction(tm)));
    this.subscriptions.push(this.eventEmitter.teamMemberLeftObservable.subscribe(tm => this.teamMemberLeftAction(tm)));
    this.subscriptions.push(this.eventEmitter.teamDeletedObservable.subscribe(t => this.teamDeletedAction(t)));
    this.subscriptions.push(this.eventEmitter.tournamentsUpdatedObservable.subscribe(t => this.updateTournamentAction(t)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadTournament(tournament: Tournament[]) {
    this.tournament = this.tournamentService.getTournament(this.tournamentId);
    if (this.tournament) {
      this.setInfoArray();
      this.loadTeams();
      this.loadTournamentParticipant();
    }
  }

  setInfoArray() {
    if (this.tournament) {
      this.infosDisplayArray = [];
      this.infosDisplayArray.push(['Turnier Name', this.tournament.getName()]);
      this.infosDisplayArray.push(['Status', this.tournament.getStatus()]);
      this.infosDisplayArray.push(['Game', this.tournament.getGameMode().getGame()]);
      this.infosDisplayArray.push(['Elimination', this.tournament.getGameMode().getElimination()]);
      this.infosDisplayArray.push(['Turniertype', this.tournament.getTournamentType().getName()]);
      this.infosDisplayArray.push(['Gamemode', this.tournament.getGameMode().getName()]);
      this.infosDisplayArray.push(['Teamteilnahme', this.getTeamteilnahmeText()]);
      this.infosDisplayArray.push(['Teamgrösse', this.getTeamSizeForInfo()]);
      this.infosDisplayArray.push([ this.getTeamSizeText(), this.tournament.getNumberOfParticipants()]);
      // TODO change local code
      this.infosDisplayArray.push(['Startzeit', formatDate(this.tournament.getStartDate(), 'd-M-yy, HH:mm', 'en-US')]);
    }
  }

  getTeamSizeText(): string {
    return this.tournament.getTeamRegistration() ? 'Anzahl Teams' : 'Anzahl Spieler';
  }

  getTeamSizeForInfo(): string {
    if (this.tournament.getTeamRegistration() && this.tournament.getGameMode().getTeamSize() > 1) {
      return this.tournament.getGameMode().getTeamSize().toString();
    } else {
      return '-';
    }
  }

  getTeamteilnahmeText(): string {
    return  this.tournament.getTeamRegistration() ? 'Ja' : 'Nein';
  }

  loadTeams() {
    if (this.tournament){
      this.teamService.getTeamByTournament(this.tournament.getId()).subscribe(res => {
        this.teams = res;
      });
    }
  }

  openTeam(team: Team) {
    const dialogRef = this.dialog.open( ShowTeamComponent, {
      width: '25vw',
      minWidth: '300px',
      data: {team,
        tournamentTeam: this.teams,
        tournament: this.tournament}
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (data.action === 'joinTeam') {
          this.teamService.joinTeam(data.team, data.pin);
        } else if (data.action === 'leaveTeam') {
          this.teamService.leaveTeam(data.team, data.teamMember);
        }
      }
    });
  }

  loadTournamentParticipant() {
    if (this.tournament){
      this.tournamentParticipantService.getTournamentParticipantByTournament(this.tournament.getId()).subscribe(res => {
        this.tournamentParticipants = res;
      });
    }
  }

  createTeam(event) {
    const dialogRef = this.dialog.open( CreateTeamComponent, {
      width: '50vw'
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result instanceof Team) {
        result.setTournament(this.tournament);
        this.teamService.createTeam(result).subscribe();
      }
    });
  }

  createTeamAction(team: Team) {
    if (team.getTournament().getId() === this.tournament.getId()) {
      this.teams.push(team);
    } else {
      console.error('Team does not match tournament');
    }
  }

  teamMemberJoinedAction(teamMember: TeamMember) {
    if (this.teams) {
      const teamToJoin: Team = this.teams.find( team => team.id as number === teamMember.teamId as number);
      teamToJoin.addTeamMember(teamMember);
    }
  }

  teamMemberLeftAction(teamMember: TeamMember) {
    this.teams.find( team => team.getId() === teamMember.teamId).removeTeamMember(teamMember);
  }

  joinTournament() {
    const tp = new TournamentParticipant(null, this.tournament.getId(), this.authService.getActiveUser());
    this.tournamentParticipantService.createTournamentParticipant(tp).subscribe();
  }

  joinTournamentAction(tp: TournamentParticipant) {
    if (this.tournament.getId() === tp.getTournamentId()){
      this.tournamentParticipants.push(tp);
    }
  }

  leaveTournament() {
    const tournamentParticipant = this.tournamentParticipants.find(
      x => x.getUser().getId() === this.authService.getActiveUser().getId());
    this.tournamentParticipantService.deleteTournamentParticipant(tournamentParticipant).subscribe();
  }

  leaveTournamentAction(tp: TournamentParticipant) {
    if (this.tournament.getId() === tp.getTournamentId()){
      const index = this.tournamentParticipants.findIndex( p => p.id === tp.id);
      if (index > -1 ) {
        this.tournamentParticipants.splice(index, 1);
      }
    }
  }

  teamDeletedAction(team: Team) {
    const index = this.teams.findIndex( x => x.getId() === team.getId());
    if (index > -1) {
      this.teams.splice(index, 1);
    }
  }

  onUserClick(event: TournamentParticipant) {
    if (event) {
      const dialogRef = this.dialog.open( DisplayUserComponent, {
        width: '50vw',
        data: {user: event.getUser()}
      });
    }
  }

  checkTeamJoined() {
    const user = this.authService.getActiveUser();
    return this.teams.find(team => team.getTeamMembers().find(member => member.getUser().getId() === user.getId()));
  }

  checkTournamentJoined() {
    return this.tournamentParticipants.find(
      x => x.getUser().getId() === this.authService.getActiveUser().getId());
  }

  updateTournamentAction(tournaments: Tournament[]) {
      const thisTournament = tournaments.find( x => x.id.toString() === this.tournamentId.toString());
      if (thisTournament) {
        tournamentDiffer(this.tournament, thisTournament);
        this.setInfoArray();
      }
  }
}
