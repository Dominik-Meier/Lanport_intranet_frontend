import {Component, Input, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from '../../interfaces/componentWithName.component';
import {DataDisplayerComponent} from '../../interfaces/dataDisplayer.component';
import {SafeHtml} from '@angular/platform-browser';
import {Tournament} from '../../../models/Tournament';
import {Lanparty} from '../../../models/Lanparty';
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
import {ShowTeamComponent} from "../../showTeam/show-team/show-team.component";
import {EventEmitterService} from "../../../services/event-emitter.service";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent extends ComponentWithNameComponent implements OnInit, DataDisplayerComponent {
  static componentName = 'TournamentComponent';
  @Input() data: any;

  tournament: Tournament;
  lanparty: Lanparty;
  infosDisplayArray = [];
  teams: Team[] = [];
  tournamentParticipants: TournamentParticipant[] = [];
  teamSizeArray = [];

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
    this.tournament = this.tournamentService.getTournament(this.data.data);
    this.setTeamSizeArray();
    this.setInfoArray();
    this.loadTeams();
    this.loadTournamentParticipant();

    this.tournamentService.getTournamentObservable.subscribe( () => {
      this.tournament = this.tournamentService.getTournament(this.data.data);
      this.setTeamSizeArray();
      this.setInfoArray();
      if (this.tournament.getTeamRegistration()) {
        this.loadTeams();
      } else {
        this.loadTournamentParticipant();
      }
    });

    this.teamService.getTeamObservable.subscribe( team => {
      if (team.getTournament().getId() === this.tournament.getId()) {
        if (this.teams.find( x => x.getId() === team.getId())) {
          const id = this.teams.findIndex( x => x.getId() === team.getId());
          this.teams[id].setName( team.getName());
          this.teams[id].setPin( team.getPin());
          this.teams[id].setTournament( team.getTournament());
          this.teams[id].setTeamMembers( team.getTeamMembers());
        } else {
          this.teams.push(team);
        }
      }
    });

    this.eventEmitter.tournamentParticipantJoinedObservable.subscribe( tp => this.joinTournamentAction(tp));
    this.eventEmitter.tournamentParticipantLeftObservable.subscribe( tp => this.leaveTournamentAction(tp));
  }

  setTeamSizeArray() {
    if (this.tournament) {
      this.teamSizeArray = [];
      for (let i = 0; i < this.tournament.getGameMode().getTeamSize(); i++) {
        this.teamSizeArray.push(i + 1);
      }
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
      this.infosDisplayArray.push(['Teamteilnahme', this.tournament.getTeamRegistration()]);
      this.infosDisplayArray.push(['Teamgrösse', this.tournament.getGameMode().getTeamSize()]);
      this.infosDisplayArray.push(['Anzahl Teams', this.tournament.getNumberOfParticipants()]);
      // TODO change local code
      this.infosDisplayArray.push(['Startzeit', formatDate(this.tournament.getStartDate(), 'd-M-yy, HH:mm', 'en-US')]);
    }
  }

  loadTeams() {
    if (this.tournament){
      this.teamService.getTeamByTournament(this.tournament.getId()).subscribe(res => {
        console.log('teams loaded from backend', res);
        console.log('teams filled with data from backend');
        this.teams = res;
      });
    }
  }

  openTeam(team: Team) {
    const dialogRef = this.dialog.open( ShowTeamComponent, {
      width: '25vw',
      minWidth: '300px',
      data: {team}
    });
  }

  loadTournamentParticipant() {
    if (this.tournament){
      this.tournamentParticipantService.getTournamentParticipantByTournament(this.tournament.getId()).subscribe(res => {
        this.tournamentParticipants = res;
      });
    }
  }

  addTeam(event) {
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

  joinTournament() {
    const tp = new TournamentParticipant(null, this.tournament.getId(), this.authService.getActiveUser());
    this.tournamentParticipantService.createTournamentParticipant(tp).subscribe();
  }

  joinTournamentAction(tp: TournamentParticipant) {
    this.tournamentParticipants.push(tp);
  }

  leaveTournament() {
    const tournamentParticipant = this.tournamentParticipants.find(
      x => x.getUser().getId() === this.authService.getActiveUser().getId());
    this.tournamentParticipantService.deleteTournamentParticipant(tournamentParticipant).subscribe();
  }

  leaveTournamentAction(tp: TournamentParticipant) {
    const index = this.tournamentParticipants.findIndex( p => p.id === tp.id);
    if (index > -1 ) {
    this.tournamentParticipants.splice(index, 1);
  }
}

  cantJoinTeam(team: Team) {
    if (this.isMember(team)) {
      return true;
    }
    if (team.teamMembers.length >= this.tournament.getGameMode().getTeamSize()) {
      return true;
    }
    if (team) {

    return false;
    }
  }

  isMember(team) {
    if (team.teamMembers.find( x => x.getUser().getId() === this.authService.getActiveUser().getId())) {
      return true;
    }
    return false;
  }

  joinTeam(team: Team) {
    // TODO create form to enter PIN to join team
    this.teamService.joinTeam(team);
    console.log('join team');
  }


  leaveTeam(team: Team) {
    const user = this.authService.getActiveUser();
    const tm = team.getTeamMembers().find(x => x.getUser().getId() === user.getId());
    if (tm) {
      console.log('found tm to remove: ', tm);
      this.teamService.leaveTeam(team, tm);
    }
  }

  onUserClick(event: TournamentParticipant) {
    console.log('user icon clicked');
    if (event) {
      const dialogRef = this.dialog.open( DisplayUserComponent, {
        width: '50vw',
        data: {user: event.getUser()}
      });

      dialogRef.afterClosed().subscribe( result => {
        console.log('user info closed');
      });

    }
  }

  checkTeamJoined() {
    const user = this.authService.getActiveUser();
    const inTeam = this.teams.find( team => team.getTeamMembers().find( member => member.getUser().getId() === user.getId()));
    return inTeam;
  }

  checkTournamentJoined() {
    return this.tournamentParticipants.find(
      x => x.getUser().getId() === this.authService.getActiveUser().getId());
  }
}
