import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CreateTeamComponent} from '../../create-team/create-team.component';
import {Team} from '../../../models/Team';
import {Tournament} from '../../../models/Tournament';
import {AuthService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-show-team',
  templateUrl: './show-team.component.html',
  styleUrls: ['./show-team.component.scss']
})
export class ShowTeamComponent {

  enteredPin: string;
  team: Team;
  tournamentTeams: Team[];
  tournament: Tournament;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CreateTeamComponent>,
              private authService: AuthService) {
    this.team = data.team;
    this.tournamentTeams = data.tournamentTeams;
    this.tournament = data.tournament;
  }

  getTeamMember() {
    return this.team.getTeamMembers().find(member => member.user.id === this.authService.getActiveUser().id);
  }

  teamMember() {
    return !!this.getTeamMember();
  }

  registerForTournament(): boolean {
    const user = this.authService.getActiveUser();
    const teamFound = this.tournamentTeams.find(team => team.getTeamMembers().find(member => member.getId() === user.getId()));
    return !!teamFound;
  }

  joinTeam() {
    this.dialogRef.close({action: 'joinTeam', pin: this.enteredPin, team: this.team});
  }

  leaveTeam() {
    this.dialogRef.close({action: 'leaveTeam', team: this.team, teamMember: this.getTeamMember()});
  }
}
