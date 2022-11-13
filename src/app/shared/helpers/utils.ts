import { IApartmentItem } from "@smart/modules/apartment/state/interfaces/apartment-item.interface";

export const mapStyle =
  'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';

export const getFavourites = (propertyId: number) => {
  const stringFav: any = localStorage.getItem('favourites');

  const favourites = JSON.parse(stringFav);

  return favourites.some((item: any) => item.propertyID === propertyId);
};


export const parseMapPoints = (values: IApartmentItem[]) => {
  return values.map((rec: any) => {
    return <any>{ // MapPoint
      properties: { propertyId: rec?.propertyID?.toString() },
      geocode: rec.geocode,
    };
  });
};


export const parseSingleMapPoint = (value: IApartmentItem) => {
  return <any>{ // IMapPoint
    properties: { propertyId: value.propertyID.toString() },
    geocode: value.geocode,
  };
};

export const getGeocodeFromPropertyID = (id: any, markers: any) =>
  markers.find(
    (m: any) => m.properties.propertyId.toString() === id.toString()
  );
