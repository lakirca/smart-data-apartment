import { IGeocode } from './geocode.interface';

export interface IMapPoint {
  /* We will omit listId since you use a fixed a test list id in this project */
  properties: { [key: string]: string };
  geocode: IGeocode;
}
