import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { ApartmentService, MapService } from '@smart/core/services';

import { IApartmentList } from '@smart/shared/interfaces/apartment-list.interface';
import { ApartmentItem } from '@smart/shared/models/apartment-item.model';

import {
  loadApartmentList,
  loadApartmentListError,
  loadApartmentListSuccess,
  loadApartmentItem,
  loadApartmentItemError,
  loadApartmentItemSuccess,
  removeApartmentItem,
  selectMarker,
} from '@smart/modules/apartment/state/apartment.actions';

import { getCoordinates } from '@smart/shared/helpers/utils';

@Injectable()
export class ApartmentStoreEffects {
  constructor(
    private actions$: Actions,
    private apartmentService: ApartmentService,
    private router: Router,
    private mapService: MapService
  ) {}

  loadApartmentListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApartmentList),
      switchMap(() =>
        this.apartmentService.getApartmentList().pipe(
          map((apartmentList: IApartmentList) =>
            loadApartmentListSuccess({ apartmentList })
          ),
          catchError((error) => of(loadApartmentListError({ error })))
        )
      )
    )
  );

  buildMapEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeApartmentItem),
        tap(({ markers }) => {
          this.mapService.goBack(markers);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  selectMarkerEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(selectMarker),
        tap(({ propertyID, apartmentItems }) => {
          const geocode: any = getCoordinates(propertyID, apartmentItems);

          this.mapService.flyToMarker({ geocode });

          this.router.navigate(['/'], {
            queryParams: { propertyID },
          });
        })
      ),
    { dispatch: false }
  );

  loadApartmentItemEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApartmentItem),
      switchMap(({ propertyID }) =>
        this.apartmentService.getApartmentById(propertyID).pipe(
          map((apartmentItem: ApartmentItem) =>
            loadApartmentItemSuccess({ apartmentItem })
          ),
          tap(({ apartmentItem }) => {
            this.mapService.flyToMarker(apartmentItem);
            this.router.navigate(['/'], {
              queryParams: { propertyID },
            });
          }),
          catchError((error) => of(loadApartmentItemError({ error })))
        )
      )
    )
  );
}
