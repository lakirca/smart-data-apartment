import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getFavourites } from '@smart/shared/helpers/utils';
import { ApartmentItem } from '@smart/shared/models/apartment-item.model';
import * as maplibregl from 'maplibre-gl';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: maplibregl.Map;

  constructor() {}

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

  flyToMarker(focusedMarker: any) {
    this.map.flyTo({
      center: [focusedMarker.geocode.Longitude, focusedMarker.geocode.Latitude],
      essential: true,
      zoom: 16,
    });
  }

  goBack(focusedMarker: any) {
    this.map.flyTo({
      center: [focusedMarker.geocode.Longitude, focusedMarker.geocode.Latitude],
      essential: true,
      zoom: 9,
    });
  }

  createMapLayerOnMap(marker: any, makerElt: any) {
    makerElt.className = 'marker';

    makerElt.id = marker?.propertyID;

    makerElt['data-coordinates'] = JSON.stringify([
      marker.geocode.Longitude,
      marker.geocode.Latitude,
    ]);

    makerElt.style.backgroundImage = getFavourites(marker?.propertyID)
      ? 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-red-heart.svg)'
      : 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-red.svg)';

    makerElt.style.width = getFavourites(marker?.propertyID) ? '48px' : '32px';
    makerElt.style.height = getFavourites(marker?.propertyID) ? '48px' : '32px';
    makerElt.style.backgroundSize = '100%';
    return makerElt;
  }

  createCustomMarkerAndPopup(makerElt: any, marker: any) {
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
      .addTo(this.map);

    const markerDiv = markerElement.getElement();

    markerDiv.addEventListener('mouseenter', () => markerElement.togglePopup());
    markerDiv.addEventListener('mouseleave', () => markerElement.togglePopup());

    return markerElement;
  }

  loadMapWithMarkers(markerElements: ApartmentItem[], router: Router) {
    markerElements.forEach((marker) => {
      let markerElt: any = document.createElement('div');
      markerElt = this.createMapLayerOnMap(marker, markerElt);

      const markerElement = this.createCustomMarkerAndPopup(markerElt, marker);

      markerElement.getElement().addEventListener('click', (event: any) => {
        this.markerClicked(event, markerElement, router);
      });

      markerElt.style.backgroundImage = getFavourites(marker.propertyID)
        ? 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-red-heart.svg)'
        : 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-red.svg)';
    });
  }

  markerClicked(event: any, markerElement: maplibregl.Marker, router: Router) {
    const propertyID = event?.srcElement['id'] || '';

    const propertyCoordinates = JSON.parse(
      event?.srcElement['data-coordinates'] || ''
    );

    this.map.flyTo({
      center: propertyCoordinates,
      essential: true,
      zoom: 16,
    });

    markerElement.togglePopup();

    router.navigate(['/'], {
      queryParams: { propertyID },
    });
  }
}
