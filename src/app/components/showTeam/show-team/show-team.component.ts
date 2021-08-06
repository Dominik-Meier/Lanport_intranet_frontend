import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CreateTeamComponent} from '../../create-team/create-team.component';
import {Team} from '../../../models/Team';
import {Tournament} from '../../../models/Tournament';
import {AuthService} from "../../../services/auth-service.service";
import {TeamMemberService} from "../../../services/dataServices/team-member.service";

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.scss']
})
export class ShowTeamComponent {

  team: Team;
  tournamentTeams: Team[];
  tournament: Tournament;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CreateTeamComponent>,
              private authService: AuthService,
              private teamService: TeamMemberService) {
    this.team = data.team;
    this.tournamentTeams = data.tournamentTeams;
    this.tournament = data.tournament;
  }

  teamMember() {
    const user = this.authService.getActiveUser();
    const teamFound = this.team.getTeamMembers().find(member => member.getId() === user.getId());
    return !!teamFound;
  }

  registerForTournament(): boolean {
    const user = this.authService.getActiveUser();
    const teamFound = this.tournamentTeams.find(team => team.getTeamMembers().find(member => member.getId() === user.getId()));
    return !!teamFound;
  }

  joinTeam() {
    console.log('not impl');
  }

  leaveTeam() {
    console.log('not impl');
  }
}
