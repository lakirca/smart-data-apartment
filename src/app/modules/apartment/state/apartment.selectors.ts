import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApartmentState } from './apartment.state';
import { IApartmentItem } from './interfaces/apartment-item.interface';

export const selectApartmentState = createFeatureSelector<ApartmentState>(
  'apartment'
);

export const getApartmentList = () =>
  createSelector(
    selectApartmentState,
    (state: ApartmentState) => state.apartmentList
  );

export const getApartmentsData = () =>
  createSelector(
    selectApartmentState,
    (state: ApartmentState) => state.apartmentList?.records
  );

export const getApartmentItemList = () =>
  createSelector(
    selectApartmentState,
    (state: ApartmentState) => state.apartmentItem
  );

export const getApartmentRange = () =>
  createSelector(selectApartmentState, (items: ApartmentState) => {
    {
      if (
        items != null &&
        items.apartmentList &&
        items.apartmentList?.records
      ) {
        const apartmentItems = items.apartmentList?.records;

        let rangeList: any = [];
        rangeList = apartmentItems.map((record: IApartmentItem) => {
          const propertyID = record.propertyID;
          let updatedData: any[] = [];
          record.floorplans.forEach((plan: any) => {
            const plans = { ...plan, propertyID };
            updatedData.push(plans);
          });

          return updatedData;
        });

        return rangeList.flat(1);
      } else {
        return null;
      }
    }
  });

export const getApartmentLoader = () =>
  createSelector(selectApartmentState, (items: ApartmentState) => {
    {
      if (items.apartmentLoader) {
        return items.apartmentLoader;
      } else {
        return false;
      }
    }
  });
