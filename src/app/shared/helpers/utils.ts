import { ApartmentItem } from '../models/apartment-item.model';
import { MapPoint } from '../models/map-point.model';

export const mapStyle =
  'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';

export const getFavourites = (propertyID: number) => {
  const stringFav: any = localStorage.getItem('favourites');

  const favourites = JSON.parse(stringFav);

  return favourites.some(
    (item: any) => item.propertyID.toString() === propertyID.toString()
  );
};

export const parseMapPoints = (values: ApartmentItem[]) => {
  return values.map((rec) => {
    return <MapPoint>{
      properties: { propertyID: rec?.propertyID?.toString() },
      geocode: rec.geocode,
    };
  });
};

export const parseSingleMapPoint = (value: ApartmentItem) => {
  return <MapPoint>{
    properties: { propertyID: value.propertyID.toString() },
    geocode: value.geocode,
  };
};

export const getGeocodeFrompropertyID = (id: number, markers: MapPoint[]) =>
  markers.find((m) => m.properties['propertyID'].toString() === id.toString());

export const getCoordinates = (
  propertyID: number,
  apartmentItems: ApartmentItem[]
) => apartmentItems.find((item) => item.propertyID === propertyID)?.geocode;
