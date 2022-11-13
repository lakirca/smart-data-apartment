import { Injectable } from '@angular/core';
import { getFavourites } from '@smart/shared/helpers/utils';
import * as maplibregl from 'maplibre-gl';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  convertPinsToMarker(mapPins: any[]) {
    return mapPins.map((mapPin) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [mapPin.geocode.Longitude, mapPin.geocode.Latitude],
      },
      properties: {},
    }));
  }

  getMapCenter(mapPins: any) {
    const bounds: any = [];

    mapPins.forEach(function (marker: any) {
      bounds.push(
        new maplibregl.LngLat(marker.geocode.Longitude, marker.geocode.Latitude)
      );
    });
    let llb = new maplibregl.LngLatBounds(...bounds);
    const centerCoordinates = llb.getCenter();
    return centerCoordinates;
  }

  flyToMarker(focusedMarker: any, map: any) {
    map.flyTo({
      center: [focusedMarker.geocode.Longitude, focusedMarker.geocode.Latitude],
      essential: true,
      zoom: 16,
    });
  }

  zoomIntoSelectedMarker(mapPins: any, markerElements: any, map: any) {
    const focusedMarker = mapPins[0];

    try {
      const toRemoveMarkers = markerElements.filter(
        (markerElement: any) =>
          markerElement.propertyid !== focusedMarker.propertyID
      );
      toRemoveMarkers.forEach((markerToRemove: any) => {
        let markerPinLayer: any = document.getElementById(
          markerToRemove.propertyid
        );
        markerPinLayer.remove();
      });

      const selectedMarker = Array.from(
        document.getElementsByClassName(
          'maplibre-marker'
        ) as HTMLCollectionOf<HTMLElement>
      );

      selectedMarker.forEach((element) => {
        element.style.backgroundImage = getFavourites(focusedMarker.propertyID)
          ? 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-blue-heart.svg)'
          : 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-blue.svg)';
      });

      this.flyToMarker(focusedMarker, map);
    } catch (e) {}
  }

  createMapLayerOnMap(marker: any, makerElt: any) {
    makerElt.className = 'marker';

    makerElt.id = marker?.propertyID;

    makerElt['data-coordinates'] = JSON.stringify([
      marker.geocode.Longitude,
      marker.geocode.Latitude,
    ]);

    makerElt.style.backgroundImage = getFavourites(
      marker?.propertyID
    )
      ? 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-red-heart.svg)'
      : 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-red.svg)';

    makerElt.style.width = getFavourites(marker?.propertyID)
      ? '48px'
      : '32px';
    makerElt.style.height = getFavourites(marker?.propertyID)
      ? '48px'
      : '32px';
    makerElt.style.backgroundSize = '100%';
    return makerElt;
  }

  createCustomMarkerAndPopup(
    makerElt: any,
    marker: any,
    map: any,
  ) {
    const markerElement = new maplibregl.Marker(makerElt)
      .setLngLat([marker.geocode.Longitude, marker.geocode.Latitude])
      .setPopup(
        new maplibregl.Popup().setHTML(
          `<h4>${marker?.name}</h4>
    <p style="color: #6c757d">
    ${marker?.city}, ${marker?.streetAddress}
    </p>`
        )
      )
      .addTo(map);

    const markerDiv = markerElement.getElement();

    markerDiv.addEventListener('mouseenter', () => markerElement.togglePopup());

    markerDiv.addEventListener('mouseleave', () => markerElement.togglePopup());
    return markerElement;
  }

  markerClicked(event: any, map: any, markerElement: any, router: any) {
    const propertyCoordinates = JSON.parse(
      event?.srcElement['data-coordinates'] || ''
    );
    map.flyTo({
      center: propertyCoordinates,
      essential: true,
      zoom: 16,
    });

    markerElement.togglePopup();
    const propertyId = event?.srcElement['id'] || '';

    router.navigate(['/'], {
      queryParams: { item: 'apartmentItem', propertyId: propertyId },
    });
  }
}
