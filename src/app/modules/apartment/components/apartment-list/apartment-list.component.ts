import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApartmentItem } from '@smart/shared/models/apartment-item.model';
import { IApartmentList } from '@smart/shared/interfaces/apartment-list.interface';
import { CommonService } from '@smart/shared/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'smart-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentListComponent implements OnChanges {
  @Input() apartmentList: IApartmentList;
  @Input() apartmentItemList: ApartmentItem[];
  @Input() loader: boolean;
  @Input() priceRange: ApartmentItem[];

  @Output() openSidenavClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectMarker: EventEmitter<any> = new EventEmitter<any>();

  togglePriceFilter: boolean = false;
  toggleBedFilter: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedPrice: number = 0;
  studio: boolean = true;
  oneBed: boolean = true;
  twoBed: boolean = true;
  threeBed: boolean = true;
  showFavorites: boolean = false;
  favoritesList: Array<any> = [];
  subscription: Subscription = new Subscription();
  screenWidth: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.screenWidth = window.innerWidth;
  }

  constructor(private commonService: CommonService) {
    this.onResize();
    this.getFavorites();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const range = changes['priceRange'];
    if (range && range.currentValue !== range.previousValue)
      this.getPriceRange();
  }

  onSelectMarker(apartmentItems: ApartmentItem[], propertyID: number) {
    this.selectMarker.emit({ propertyID, apartmentItems });
  }

  toggleRents() {
    this.toggleBedFilter = false;
    this.togglePriceFilter = !this.togglePriceFilter;
  }

  toggleBeds() {
    this.togglePriceFilter = false;
    this.toggleBedFilter = !this.toggleBedFilter;
  }

  getPriceRange() {
    if (this.priceRange?.length) {
      const priceList = this.priceRange.map((item: any) => item.price);

      this.minPrice = Math.min(...priceList);
      this.maxPrice = Math.max(...priceList);
    }
  }

  getFavorites() {
    this.favoritesList = this.commonService.getFavourities();
  }

  getFavoritesByID(propertyID: number) {
    let favorites: boolean = false;

    if (this.favoritesList?.length) {
      this.favoritesList?.forEach((item) => {
        if (item.propertyID == propertyID) {
          favorites = true;
        }
      });
    }
    return favorites;
  }

  /**
   * OPEN SIDENAV ( FOR MOBILE VIEW (SCREENWIDTH <= 480))
   */
  openSidenav() {
    this.openSidenavClick.emit('open');
  }
}
