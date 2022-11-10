import { createAction, props } from '@ngrx/store';
import { IApartmentList } from './interfaces/apartment-list.interface';
import { IApartmentItem } from './interfaces/apartment-item.interface';

export enum ApartmentActionType {
  LoadApartmentList = '[Apartment] Load Apartment Request',
  LoadApartmentListSuccess = '[Apartment] Load Apartment Success',
  LoadApartmentListFail = '[Apartment] Load Apartment Fail',

  LoadApartmentItem = '[Apartment Item] Load Apartment Item Request',
  LoadApartmentItemSuccess = '[Apartment Item] Load Apartment Item Success',
  LoadApartmentItemFail = '[Apartment Item] Load Apartment Item Fail',

  RemoveApartmentItem = '[Apartment Item] Remove Apartment Item',
}

export const loadApartmentList = createAction(
  ApartmentActionType.LoadApartmentList
);

export const loadApartmentListSuccess = createAction(
  ApartmentActionType.LoadApartmentListSuccess,
  props<{ apartmentList: IApartmentList }>()
);

export const loadApartmentListError = createAction(
  ApartmentActionType.LoadApartmentListFail,
  props<{ error: any }>()
);

export const loadApartmentItem = createAction(
  ApartmentActionType.LoadApartmentItem,
  props<{ productId: number }>()
);

export const loadApartmentItemSuccess = createAction(
  ApartmentActionType.LoadApartmentItemSuccess,
  props<{ apartmentItem: IApartmentItem }>()
);

export const loadApartmentItemError = createAction(
  ApartmentActionType.LoadApartmentItemFail,
  props<{ error: any }>()
);

export const removeApartmentItem = createAction(
  ApartmentActionType.RemoveApartmentItem
);
