import { IApartmentList } from './interfaces/apartment-list.interface';
import { IApartmentItem } from './interfaces/apartment-item.interface';

export interface ApartmentState {
  apartmentList: IApartmentList | null;
  apartmentItem: IApartmentItem | null;
  productId: number;
  apartmentLoader: boolean;
  error: any;
}

export const initialState: ApartmentState = {
  apartmentList: null,
  apartmentItem: null,
  productId: -1,
  apartmentLoader: false,
  error: null,
};
