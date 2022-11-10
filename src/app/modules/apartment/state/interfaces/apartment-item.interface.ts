import { IFloorPlan } from './floor-plan.interface';
import { IGeocode } from './geocode.interface';

export interface IApartmentItem {
  city: string;
  favorite: boolean;
  floorplans: IFloorPlan[];
  geocode: IGeocode;
  IsValid: boolean;
  Latitude: string;
  Longitude: string;
  Percision: string;
  highValueAmenities: string[];
  highestSentCommissions: number;
  listID: number;
  management: any;
  name: string;
  onsiteManager: null;
  order: number;
  paidUtilities: [];
  pets: boolean;
  photo: string;
  propertyID: number;
  proximity: number;
  section8: boolean;
  seniorHousing: boolean;
  state: string;
  streetAddress: string;
  studentHousting: boolean;
  washerDry: string;
}
