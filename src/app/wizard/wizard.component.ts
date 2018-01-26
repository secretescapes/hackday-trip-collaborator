import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  private boardId: string;

  STEPS = [
    'name-and-collaborators',
    'destination',
    'activities',
    'months'
  ];

  currentStep = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.setBoardIdFromParams();
    this.currentStep = this.STEPS.indexOf(this.route.children[0].snapshot.url[0].path);
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
    if (!this.isLastStep()) {
      this.currentStep ++;
      this.goToCurrentPage();
    }
  }

  previousStep() {
    if (!this.isFirstStep()) {
      this.currentStep --;
      this.goToCurrentPage();
    }
  }

  isFirstStep() {
    return this.currentStep === 0;
  }

  isLastStep() {
    return this.currentStep === (this.STEPS.length - 1);
  }

  onFinishWizard() {
    this.router.navigate([`/app/board/${this.boardId}/sales`]);
  }

  private goToCurrentPage() {
    this.router.navigate([`/app/board/${this.boardId}/wizard/${this.STEPS[this.currentStep]}`]);
  }

}
