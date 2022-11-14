import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IApartmentList } from '@smart/shared/interfaces/apartment-list.interface';
import { ApartmentItem } from '@smart/shared/models/apartment-item.model';

@Component({
  selector: 'smart-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Input() apartmentList: IApartmentList;
  @Input() apartmentItemList: ApartmentItem;
  @Input() loader: boolean | any;
  @Input() priceRange: ApartmentItem[];

  @Output() removeApartmentItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectMarker: EventEmitter<any> = new EventEmitter<any>();
  @Output() openSidenavClick: EventEmitter<any> = new EventEmitter<any>();

  onSelectMarker(event: {
    propertyID: number;
    apartmentItems: ApartmentItem[];
  }) {
    this.selectMarker.emit({
      propertyID: event.propertyID,
      apartmentItems: event.apartmentItems,
    });
  }

  onRemoveApartmentItem(markers: any) {
    this.removeApartmentItem.emit(markers);
  }

  onOpenSidenavClick(event: any) {
    this.openSidenavClick.emit(event);
  }
}
