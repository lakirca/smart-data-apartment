import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as selectors from '@smart/modules/apartment/state/apartment.selectors';
import { CommonService } from '@smart/shared/services/common.service';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ApartmentState } from '../../state/apartment.state';
import {
  loadApartmentItem,
  removeApartmentItem,
} from '../../state/apartment.actions';

@Component({
  selector: 'smart-apartment-list-item',
  templateUrl: './apartment-list-item.component.html',
  styleUrls: ['./apartment-list-item.component.scss'],
})
export class ApartmentListItemComponent implements OnInit, OnDestroy {
  apartmentItemList$: Observable<any> | undefined;
  subscription: Subscription = new Subscription();
  activeQuery: any;
  showGallery: boolean = false;
  changeColor: boolean = false;
  favoritesList: Array<any> = [];

  constructor(
    private store: Store<ApartmentState>,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params: any) => {
        this.activeQuery = { ...params };

        if (params?.propertyId) {
          this.store.dispatch(
            loadApartmentItem({ productId: +params?.propertyId })
          );
        }
      })
    );

    this.apartmentItemList$ = this.store.pipe(
      select(selectors.getApartmentItemList())
    );

    this.getFavorites();
  }

  /**
   * TOGGLE GALLERY
   */
  toggleGallery() {
    this.showGallery = !this.showGallery;
  }

  /**
   * PREVIOUS ( GO BACK )
   */
  goBack() {
    this.store.dispatch(removeApartmentItem());

    this.router.navigate(['/']);
  }

  /**
   * TOGGLE FAVORITES
   * @param apartmentItem
   */
  toggleFavorite(apartmentItem: any, isFavorites?: boolean) {
    // 1) IF FAVORITES, THEN UPON TOGGLE REMOVE FAVORITES
    if (isFavorites) {
      this.removeFavorites(apartmentItem);
    } else {
      // 2) ELSE ADD FAVORITES
      this.changeColor = !this.changeColor;
      const item = { ...apartmentItem };
      item.favorite = true;
      this.commonService.saveFavoritesToLocalStorage(item);
      this.toastr.success(`${apartmentItem.name} is added as favorite`);
    }
  }

  /**
   * REMOVE FAVORITES
   */
  removeFavorites(apartmentItem: any) {
    this.commonService.removeFavoritesItemById(this.activeQuery?.propertyId);
    this.toastr.error(`${apartmentItem.name} is removed from favorites`);
    this.getFavorites();
  }

  /**
   * GET FAVORITES
   */
  getFavorites() {
    this.favoritesList = this.commonService.getFavoritesListById(
      this.activeQuery?.propertyId
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
