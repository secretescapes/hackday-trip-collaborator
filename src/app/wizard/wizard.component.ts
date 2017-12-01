import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  private boardId: string;

  steps = [
    'name',
    'budget'
  ];

  currentStep = 0;

  test: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.setBoardIdFromParams();
    this.currentStep = this.steps.indexOf(this.route.children[0].snapshot.url[0].path);
    if (this.currentStep > -1) {
      this.goToCurrentPage();
    } else {
      // error, redirect somewhere
    }
  }

  private setBoardIdFromParams() {
    this.route.params.subscribe((params: any) => params.id ? this.boardId = params.id : null);
  }

  nextStep() {
    if (this.currentStep < (this.steps.length - 1)) {
      this.currentStep ++;
      this.goToCurrentPage();
    }
  }


  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep --;
      this.goToCurrentPage();
    }
  }

  private goToCurrentPage() {
    this.router.navigate([`/app/board/${this.boardId}/wizard/${this.steps[this.currentStep]}`]);
  }

}
