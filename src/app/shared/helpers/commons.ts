import maplibregl from "maplibre-gl";

export const MAP_LAYERS: maplibregl.AnyLayer = {
  id: 'SmartDataApartments',
  source: 'SmartDataApartments',
  type: 'symbol',
  layout: {
    'icon-image': 'smart-marker',
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


export const MAPTILER_API_KEY = `SoL71Zyf7SmLrVYWC7fQ`;
export const MAPTILER_MAP_STYLE = `https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json`;
