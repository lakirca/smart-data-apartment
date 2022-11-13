import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  mergeMap,
} from 'rxjs/operators';

import { ApartmentService } from '@smart/core/services';
import { IApartmentList } from './interfaces/apartment-list.interface';
import {
  loadApartmentList,
  loadApartmentListError,
  loadApartmentListSuccess,
  loadApartmentItem,
  loadApartmentItemError,
  loadApartmentItemSuccess,
} from './apartment.actions';
import { IApartmentItem } from './interfaces/apartment-item.interface';

@Injectable()
export class ApartmentStoreEffects {
  constructor(
    private actions$: Actions,
    private apartmentService: ApartmentService
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

  loadApartmentItemEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApartmentItem),
      switchMap(({ productId }) =>
        this.apartmentService.getApartmentById(productId).pipe(
          map((apartmentItem: IApartmentItem) =>
            loadApartmentItemSuccess({ apartmentItem })
          ),
          catchError((error) => of(loadApartmentItemError({ error })))
        )
      )
    )
  );
}
