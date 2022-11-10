import { Component, Input } from '@angular/core';

@Component({
  selector: 'smart-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  @Input() apartmentItem: any;
}
