import { createAction, props } from '@ngrx/store';
import { IApartmentList } from '../../../shared/interfaces/apartment-list.interface';
import { ApartmentItem } from '../../../shared/models/apartment-item.model';

export enum ApartmentActionType {
  LoadApartmentList = '[Apartment] Load Apartment Request',
  LoadApartmentListSuccess = '[Apartment] Load Apartment Success',
  LoadApartmentListFail = '[Apartment] Load Apartment Fail',

  LoadApartmentItem = '[Apartment Item] Load Apartment Item Request',
  LoadApartmentItemSuccess = '[Apartment Item] Load Apartment Item Success',
  LoadApartmentItemFail = '[Apartment Item] Load Apartment Item Fail',

  BuildMap = '[Map] Build Map Request',
  BuildMapSuccess = '[Map] Build Map Success',
  BuildMapFail = '[Map] Build Map Fail',

  SelectMarker = '[Map] SelectMarker Request',
  SelectMarkerSuccess = '[Map] Select Marker Success',
  SelectMarkerFail = '[Map] Select Marker Fail',

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
  props<{ error: Error }>()
);

export const loadApartmentItem = createAction(
  ApartmentActionType.LoadApartmentItem,
  props<{ propertyID: number }>()
);

export const loadApartmentItemSuccess = createAction(
  ApartmentActionType.LoadApartmentItemSuccess,
  props<{ apartmentItem: ApartmentItem }>()
);

export const loadApartmentItemError = createAction(
  ApartmentActionType.LoadApartmentItemFail,
  props<{ error: Error }>()
);

export const removeApartmentItem = createAction(
  ApartmentActionType.RemoveApartmentItem,
  props<{ markers: ApartmentItem[] }>()
);

export const buildMap = createAction(
  ApartmentActionType.BuildMap,
  props<{ propertyID: number }>()
);

export const buildMapSuccess = createAction(
  ApartmentActionType.BuildMapSuccess,
  props<{ apartmentItem: ApartmentItem }>()
);

export const buildMapError = createAction(
  ApartmentActionType.BuildMapFail,
  props<{ error: Error }>()
);

export const selectMarker = createAction(
  ApartmentActionType.SelectMarker,
  props<{ propertyID: number; apartmentItems: ApartmentItem[] }>()
);

export const selectMarkerSuccess = createAction(
  ApartmentActionType.SelectMarkerSuccess,
  props<{ apartmentItem: ApartmentItem }>()
);

export const selectMarkerError = createAction(
  ApartmentActionType.SelectMarkerFail,
  props<{ error: Error }>()
);
