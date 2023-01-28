import { Component, OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstimateCreate } from 'src/app/interfaces/estimate/estimate-create.model';
import { EstimateService } from '../../services/estimate.service';

@Component({
  selector: 'app-free-estimate',
  templateUrl: './free-estimate.component.html',
  styleUrls: ['./free-estimate.component.css']
})
export class FreeEstimateComponent implements OnInit {
  estimateForm: FormGroup;
  estimateCreateRequest: EstimateCreate;

  constructor(private repository: EstimateService, private toastr: ToastrService) {}

  ngOnInit() {
    this.estimateForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      message: new FormControl(null, [Validators.required, Validators.maxLength(120)])
    });
  }

  isFormValid() {
    if(this.estimateForm.invalid) {
      this.estimateForm.markAllAsTouched();
    } else {
      this.submitForm();
    }
  }

  submitForm() {
    const formValues = this.estimateForm.value;
    this.estimateCreateRequest = {
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phone,
      message: formValues.message
    };

    this.repository.createEstimate(this.estimateCreateRequest).subscribe({
      next: () => {
        this.estimateForm.reset();
        this.toastr.success("Thank you! Estimate request has been sent.");
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }
}
