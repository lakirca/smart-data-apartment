import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { CommonService } from '@smart/shared/services/common.service';

import { ApartmentItem } from '@smart/shared/models/apartment-item.model';

@Component({
  selector: 'smart-apartment-list-item',
  templateUrl: './apartment-list-item.component.html',
  styleUrls: ['./apartment-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentListItemComponent {
  @Input() apartmentItemList: ApartmentItem;
  @Output() removeApartmentItem: EventEmitter<any> = new EventEmitter<any>();

  showGallery: boolean = false;
  favoritesList: ApartmentItem[];

  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {
    this.favoritesList = this.commonService.getFavourities();
  }

  toggleGallery() {
    this.showGallery = !this.showGallery;
  }

  goBack(markers: ApartmentItem) {
    this.removeApartmentItem.emit(markers);
  }

  getFavorite(apartmentItem: ApartmentItem): boolean {
    let favorite = false;
    this.favoritesList?.forEach((item) => {
      if (item.propertyID == apartmentItem.propertyID) {
        favorite = true;
      }
    });

    return favorite;
  }

  toggleFavorite(apartmentItem: ApartmentItem, isFavorites?: boolean) {
    if (isFavorites) {
      this.removeFavorites(apartmentItem);
      this.changeIcon(apartmentItem, false);
    } else {
      const item = { ...apartmentItem };
      item.favorite = true;
      this.commonService.saveFavoritesToLocalStorage(item);
      this.toastr.success(`${apartmentItem.name} is added as favorite`);
      this.changeIcon(apartmentItem, true);
    }
    this.favoritesList = this.commonService.getFavourities();
  }

  changeIcon(apartmentItem: ApartmentItem, favorited: boolean) {
    const markers: any[] = Array.from(
      document.getElementsByClassName('marker') as HTMLCollectionOf<HTMLElement>
    );

    const selectedMarker: any = markers.find(
      (marker) => marker.id.toString() === apartmentItem.propertyID.toString()
    );

    selectedMarker.style.backgroundImage = favorited
      ? 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-red-heart.svg)'
      : 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-red.svg)';
  }

  removeFavorites(apartmentItem: ApartmentItem) {
    this.commonService.removeFavoritesItemById(apartmentItem.propertyID);
    this.toastr.error(`${apartmentItem.name} is removed from favorites`);
  }
}
