import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DestinationService} from '../destination.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  destinations: Observable<any[]>;
  boardId: string;

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService
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
    this.destinationService.getDestinations(boardId).then((destinationsObservable) => this.destinations = destinationsObservable);
  }

  updateDestination(name: string, value: boolean) {
    this.destinationService.changeDestinationValue(this.boardId, name, !value);
  }

}
