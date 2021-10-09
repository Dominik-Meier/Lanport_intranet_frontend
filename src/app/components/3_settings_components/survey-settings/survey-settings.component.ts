import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventEmitterService} from '../../../services/event-emitter.service';
import {Survey} from '../../../models/Survey';
import {MatTableDataSource} from '@angular/material/table';
import {SurveyService} from '../../../services/dataServices/survey.service';
import {Subscription} from 'rxjs';
import {LanpartyService} from '../../../services/dataServices/lanparty.service';
import {MatDialog} from '@angular/material/dialog';
import {CreateSurveyComponent} from './create-survey/create-survey.component';

@Component({
  selector: 'app-survey-settings',
  templateUrl: './survey-settings.component.html',
  styleUrls: ['./survey-settings.component.scss']
})
export class SurveySettingsComponent implements OnInit, OnDestroy {

  constructor(private eventEmitter: EventEmitterService,
              private surveyService: SurveyService,
              private lanpartyService: LanpartyService,
              public dialog: MatDialog, ) { }

  surveys: Survey[];
  subscriptions: Subscription[] = [];

  /** Table parameters */
  dataSource: MatTableDataSource<Survey>;
  columnsToDisplay = [ 'name', 'lanparty', 'startDate', 'endDate', 'actions'];

  ngOnInit(): void {
    this.subscriptions.push(this.surveyService.loadAllSurveys().subscribe( s => this.loadData(s)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  loadData(surveys: Survey[]) {
    this.surveys = surveys;
    this.dataSource = new MatTableDataSource<Survey>(this.surveys);
  }

  addSurvey(event) {
    console.log('add survey: ', event);
    const survey = new Survey(null, '', this.lanpartyService.getLanparties().find(x => x.active === true).id,
        null, null, []);
    const dialogRef = this.dialog.open( CreateSurveyComponent, {
        width: '50vw',
        minWidth: '350px',
        height: '90vh',
        data: {survey}
      });
    dialogRef.afterClosed().subscribe(createdSurvey => {
        if (createdSurvey) {
          this.surveyService.createSurvey(createdSurvey).subscribe();
        }
      });

  }

  deleteTournament(event, row: Survey) {
    this.surveyService.deleteSurvey(row.id).subscribe();
  }
}
