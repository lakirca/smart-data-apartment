import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ApartmentItem } from '@smart/shared/models/apartment-item.model';

@Component({
  selector: 'smart-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  @Input() apartmentItem: ApartmentItem;
}
