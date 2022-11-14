import { IApartmentList } from '@smart/shared/interfaces/apartment-list.interface';
import { ApartmentItem } from '@smart/shared/models/apartment-item.model';
import { MapPoint } from '@smart/shared/models/map-point.model';

export interface ApartmentState {
  apartmentList: IApartmentList | null;
  apartmentItem: ApartmentItem | null;
  propertyID: number;
  apartmentLoader: boolean;
  error: Error | null;
  mapPoints: MapPoint[] | null;
}

export const initialState: ApartmentState = {
  apartmentList: null,
  apartmentItem: null,
  propertyID: -1,
  apartmentLoader: false,
  error: null,
  mapPoints: null,
};
