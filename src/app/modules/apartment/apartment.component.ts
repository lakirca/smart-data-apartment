import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  loadApartmentItem,
  loadApartmentList,
  removeApartmentItem,
  selectMarker,
} from './state/apartment.actions';
import {
  getApartmentLoader,
  getApartmentList,
  getApartmentItemList,
  getMapPoints,
  getMarkerElements,
  getApartmentRange,
} from './state/apartment.selectors';
import { ApartmentState } from './state/apartment.state';
import { ApartmentItem } from '../../shared/models/apartment-item.model';

@Component({
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentComponent implements OnInit {
  mapPoints$: Observable<any>;
  loader$: Observable<boolean>;
  apartmentList$: Observable<any>;
  apartmentItemList$: Observable<any>;
  markerElements$: Observable<ApartmentItem[] | any>;
  priceRange$: Observable<any>;

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<ApartmentState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(loadApartmentList());

    this.loader$ = this.store.pipe(select(getApartmentLoader()));
    this.apartmentList$ = this.store.pipe(select(getApartmentList()));
    this.apartmentItemList$ = this.store.pipe(select(getApartmentItemList()));
    this.mapPoints$ = this.store.pipe(select(getMapPoints()));
    this.markerElements$ = this.store.pipe(select(getMarkerElements()));
    this.priceRange$ = this.store.pipe(select(getApartmentRange()));

    this.subscription.add(
      this.activatedRoute.queryParams.subscribe(({ propertyID }) => {
        if (propertyID) this.store.dispatch(loadApartmentItem({ propertyID }));
      })
    );
  }

  onSelectMarker(event: {
    propertyID: number;
    apartmentItems: ApartmentItem[];
  }) {
    this.store.dispatch(
      selectMarker({
        propertyID: event.propertyID,
        apartmentItems: event.apartmentItems,
      })
    );
  }

  onRemoveApartmentItem(markers: ApartmentItem[]) {
    this.store.dispatch(removeApartmentItem({ markers }));
  }

  toggleSidenav(event: Event, sidenav: any) {
    if (event) {
      sidenav.toggle();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
