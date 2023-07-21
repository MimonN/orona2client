import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Estimate } from 'src/app/interfaces/estimate/estimate.model';
import { EstimateService } from 'src/app/shared/services/estimate.service';

@Component({
  selector: 'app-estimate-list',
  templateUrl: './estimate-list.component.html',
  styleUrls: ['./estimate-list.component.css'],
})
export class EstimateListComponent implements OnInit {
  estimateList: Estimate[];

  constructor(
    private repository: EstimateService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getEstimates();
  }

  private getEstimates = () => {
    this.repository.getAllEstimates().subscribe({
      next: (response: Estimate[]) => {
        this.estimateList = response;
        this.spinner.hide();
      },
    });
  };
}
