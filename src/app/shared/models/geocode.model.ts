import { IGeocode } from '../interfaces/geocode.interface';

export class Geocode implements IGeocode {
  Longitude: string = '';
  Latitude: string = '';
  Percision: string = '';
  IsValid: boolean = false;
}
