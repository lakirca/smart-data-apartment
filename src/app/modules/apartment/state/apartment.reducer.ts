import { Action, createReducer, on } from '@ngrx/store';
import { parseMapPoints } from '@smart/shared/helpers/utils';
import * as apartmentActions from './apartment.actions';
import { ApartmentState, initialState } from './apartment.state';

const featureReducer = createReducer(
  initialState,

  on(apartmentActions.loadApartmentList, (state: ApartmentState) => ({
    ...state,
    apartmentLoader: true,
    mapPoints: null,
    error: null,
  })),
  on(apartmentActions.loadApartmentListSuccess, (state, { apartmentList }) => {
    return {
      ...state,
      apartmentList,
      mapPoints: parseMapPoints(apartmentList.records),
      apartmentLoader: false,
    };
  }),
  on(apartmentActions.loadApartmentListError, (state, { error }) => {
    return {
      ...state,
      apartmentList: null,
      apartmentLoader: false,
      mapPoints: null,
      error,
    };
  }),

  on(apartmentActions.loadApartmentItem, (state: ApartmentState) => ({
    ...state,
    apartmentLoader: true,
    apartmentItem: null,
    propertyID: -1,
    error: null,
  })),
  on(apartmentActions.loadApartmentItemSuccess, (state, { apartmentItem }) => {
    return {
      ...state,
      apartmentItem,
      propertyID: apartmentItem.propertyID,
      apartmentLoader: false,
    };
  }),
  on(apartmentActions.loadApartmentItemError, (state, { error }) => {
    return {
      ...state,
      apartmentItem: null,
      apartmentLoader: false,
      propertyID: -1,
      error,
    };
  }),

  on(apartmentActions.removeApartmentItem, (state: ApartmentState) => ({
    ...state,
    error: null,
    apartmentItem: null,
    propertyID: -1,
  }))
);

export function reducer(state: ApartmentState | undefined, action: Action) {
  return featureReducer(state, action);
}
