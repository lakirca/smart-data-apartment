import { Component, Input } from '@angular/core';

@Component({
  selector: 'smart-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent {
  @Input() apartmentItem: any;
}
