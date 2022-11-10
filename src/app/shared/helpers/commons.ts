export const MAP_LAYERS: mapboxgl.AnyLayer = {
  id: 'SmartDataApartments',
  source: 'SmartDataApartments',
  type: 'symbol',
  layout: {
    'text-size': 24,
    'text-transform': 'uppercase',
    'text-offset': [0, 1.5],
  },
  paint: {
    'text-color': '#f16624',
    'text-halo-color': '#fff',
    'text-halo-width': 2,
  },
};
