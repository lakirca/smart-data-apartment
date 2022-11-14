import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ApartmentItem } from '@smart/shared/models/apartment-item.model';

@Component({
  selector: 'smart-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansComponent {
  @Input() apartmentItem: ApartmentItem;
}
