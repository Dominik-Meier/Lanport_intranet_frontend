import {Component, Input, OnInit} from '@angular/core';
import {ComponentWithNameComponent} from "../../interfaces/componentWithName.component";
import {DataDisplayerComponent} from "../../interfaces/dataDisplayer.component";
import {SafeHtml} from "@angular/platform-browser";
import {Tournament} from "../../../models/Tournament";
import {Lanparty} from "../../../models/Lanparty";
import {TournamentService} from "../../../services/dataServices/tournament.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateTeamComponent} from "../../create-team/create-team.component";
import {Team} from "../../../models/Team";
import {TeamService} from "../../../services/dataServices/team.service";
import {TeamMemberService} from "../../../services/dataServices/team-member.service";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent extends ComponentWithNameComponent implements OnInit, DataDisplayerComponent {
  static componentName = "TournamentComponent";
  @Input() data: any;

  tournament: Tournament;
  lanparty: Lanparty;
  infosDisplayArray = [];
  teams: Team[] = [];
  teamSizeArray = [];

  constructor(private tournamentService: TournamentService,
              private teamService: TeamService,
              private teamMemberService: TeamMemberService,
              public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    console.log(this.data);

    this.tournament = this.tournamentService.getTournament(this.data.data);
    this.setTeamSizeArray();
    this.setInfoArray()
    this.loadTeams();
    console.log(this.tournament);

    this.tournamentService.getTournamentObservable.subscribe( () => {
      this.tournament = this.tournamentService.getTournament(this.data.data);
      console.log(this.tournament);
      console.log('set Tournament infos to array');
      this.setTeamSizeArray();
      this.setInfoArray();
      console.log('reload Tournament teams');
      this.loadTeams();
    });

    this.teamService.getTeamObservable.subscribe( team => {
      console.log('observable', team);
      if (team.getTournament().getId() === this.tournament.getId()) {
        console.log('team for this tournament');
        if (this.teams.find( x => x.getId() === team.getId())) {
          console.log('team exists');
          const id = this.teams.findIndex( x => x.getId() === team.getId())
          this.teams[id].setName( team.getName());
          this.teams[id].setPin( team.getPin());
          console.log('team updated');
        } else {
          this.teams.push(team);
          console.log('team added');
        }
      }
    })
  }

  setTeamSizeArray() {
    if(this.tournament) {
      this.teamSizeArray = [];
      for (let i = 0; i < this.tournament.getGameMode().getTeamSize(); i++) {
        this.teamSizeArray.push(i+1);
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
      this.infosDisplayArray.push(['Startzeit', this.tournament.getStartDate()]);
    }
  }

  loadTeams() {
    if(this.tournament){
      this.teamService.getTeamByTournament(this.tournament.getId()).subscribe(res =>{
        console.log('teams loaded from backend', res);
        console.log('teams filled with data from backend');
        this.teams = res;
      })
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
      console.log('log mat dialog res', result);
    });
  }
}
