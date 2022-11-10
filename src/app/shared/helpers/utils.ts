export const mapStyle =
  'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';

export const getFavourites = (propertyId: number) => {
  const stringFav: any = localStorage.getItem('favourites');

  const favourites = JSON.parse(stringFav);

  return favourites.some((item: any) => item.propertyID === propertyId);
};
