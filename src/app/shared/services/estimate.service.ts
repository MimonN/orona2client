import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstimateCreate } from 'src/app/interfaces/estimate/estimate-create.model';
import { EstimateUpdate } from 'src/app/interfaces/estimate/estimate-update.model';
import { Estimate } from 'src/app/interfaces/estimate/estimate.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstimateService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  public getAllEstimates() {
    // this.spinner.show();
    return this.http.get<Estimate[]>(this.baseApiUrl + '/api/EstimateRequests/GetAllEstimates');
  }

  public getEstimateById(id: number) {
    this.spinner.show();
    return this.http.get<Estimate>(this.baseApiUrl + '/api/EstimateRequests/GetEstimateById/' + id);
  }

  public createEstimate(createEstimateRequest: EstimateCreate) {
    return this.http.post<EstimateCreate>(this.baseApiUrl + '/api/EstimateRequests/CreateEstimate', createEstimateRequest);
  }

  public updateEstimate(id: number, updateEstimateRequest: EstimateUpdate) {
    return this.http.put<EstimateUpdate>(this.baseApiUrl + '/api/EstimateRequests/UpdateEstimate/' + id, updateEstimateRequest);
  }

  public deleteEstimate(id: number) {
    return this.http.delete<Estimate>(this.baseApiUrl + '/api/EstimateRequests/DeleteEstimate/' + id);
  }
}
