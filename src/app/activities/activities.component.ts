import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ActivitiesService} from '../activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activities: Observable<any[]>;
  boardId: string;

  constructor(
    private route: ActivatedRoute,
    private activitiesComponent: ActivitiesService
  ) { }

  ngOnInit() {
    this.setBoardIdFromParams();
  }

  private setBoardIdFromParams() {
    this.route.params.subscribe((params: any) => params.id ? this.onBoardId(params.id) : this.setBoardIdFromParentParams());
  }

  private setBoardIdFromParentParams() {
    this.route.parent.params.subscribe((params: any) => params.id ? this.onBoardId(params.id) : null);
  }

  private onBoardId(boardId: string) {
    this.boardId = boardId;
    this.activitiesComponent.getActivities(boardId).then((activitiesObservable) => this.activities = activitiesObservable);
  }

  updateActivity(name: string, value: boolean) {
    this.activitiesComponent.changeActivityValue(this.boardId, name, !value);
  }

}
