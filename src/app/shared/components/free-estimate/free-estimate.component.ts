import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-free-estimate',
  templateUrl: './free-estimate.component.html',
  styleUrls: ['./free-estimate.component.css']
})
export class FreeEstimateComponent {
  @ViewChild('estimate') form: NgForm;

  constructor() {}

  onSubmit() {
    
  }
}
