import { Action, createReducer, on } from '@ngrx/store';
import * as apartmentActions from './apartment.actions';
import { ApartmentState, initialState } from './apartment.state';

const featureReducer = createReducer(
  initialState,

  on(apartmentActions.loadApartmentList, (state: ApartmentState) => ({
    ...state,
    apartmentLoader: true,
    error: null,
  })),
  on(apartmentActions.loadApartmentListSuccess, (state, { apartmentList }) => {
    return { ...state, apartmentList, apartmentLoader: false };
  }),
  on(apartmentActions.loadApartmentListError, (state, { error }) => {
    return {
      ...state,
      apartmentList: null,
      apartmentLoader: false,
      error,
    };
  }),

  on(apartmentActions.loadApartmentItem, (state: ApartmentState) => ({
    ...state,
    apartmentLoader: true,
    apartmentItem: null,
    productId: -1,
    error: null,
  })),
  on(apartmentActions.loadApartmentItemSuccess, (state, { apartmentItem }) => {
    console.log(apartmentItem);

    return {
      ...state,
      apartmentItem,
      productId: apartmentItem.propertyID,
      apartmentLoader: false,
    };
  }),
  on(apartmentActions.loadApartmentItemError, (state, { error }) => {
    return {
      ...state,
      apartmentItem: null,
      apartmentLoader: false,
      productId: -1,
      error,
    };
  }),

  on(apartmentActions.removeApartmentItem, (state: ApartmentState) => ({
    ...state,
    error: null,
    apartmentItem: null,
    productId: -1,
  }))
);

export function reducer(state: ApartmentState | undefined, action: Action) {
  return featureReducer(state, action);
}
