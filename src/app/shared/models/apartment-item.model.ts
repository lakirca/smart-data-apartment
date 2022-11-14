import { Property } from './property.model';

export class ApartmentItem extends Property {
  IsValid: boolean;
  Latitude: string;
  Longitude: string;
  Percision: string;
  highestSentCommissions: number;
  order: number;
  pets: boolean;
  photo: string;
  proximity: number;
  state: string;
  washerDry: string;
}
