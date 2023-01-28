import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EstimateUpdate } from 'src/app/interfaces/estimate/estimate-update.model';
import { Estimate } from 'src/app/interfaces/estimate/estimate.model';
import { EstimateService } from 'src/app/shared/services/estimate.service';

@Component({
  selector: 'app-estimate-details',
  templateUrl: './estimate-details.component.html',
  styleUrls: ['./estimate-details.component.css'],
})
export class EstimateDetailsComponent implements OnInit {
  id: number;
  estimateDetails: Estimate;
  estimateUpdateRequest: EstimateUpdate;
  estimateForm: FormGroup;
  statuses = [
    {value: "In Process"},
    {value: "New"},
    {value: "Closed"},
  ];
  modalRef?: BsModalRef;
  message?: string;

  constructor(
    private route: ActivatedRoute,
    private repository: EstimateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = parseInt(params.get('id'));

        if (this.id) {
          this.repository.getEstimateById(this.id).subscribe({
            next: (response) => {
              this.estimateDetails = response;
              this.spinner.hide();
              this.createForm();
            },
          });
        }
      },
    });
  }

  createForm() {
    this.estimateForm = new FormGroup({
      note: new FormControl(this.estimateDetails.note),
      status: new FormControl(this.estimateDetails.status)
    });
  }

  onSubmit() {
    const formValues = this.estimateForm.value;
    this.estimateUpdateRequest = {
      name: this.estimateDetails.name,
      phone: this.estimateDetails.phone,
      email: this.estimateDetails.email,
      message: this.estimateDetails.message,
      note: formValues.note,
      status: formValues.status
    }

    this.repository.updateEstimate(this.id, this.estimateUpdateRequest).subscribe({
      next: () => {
        console.log("what is situation here?");
        this.toastr.success("Estimate request details have been saved");
      }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog-centered'});
  }
 
  confirm(id: number): void {
    // this.message = 'Confirmed!';
    this.deleteEstimate(id);
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

  deleteEstimate(id: number) {
    this.repository.deleteEstimate(id).subscribe({
      next: () => {
        this.router.navigate(['cms/estimate/list']);
        this.toastr.success("Estimate request deleted");
      }
    })
  }

}
