import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { select, Store } from '@ngrx/store';

import * as mapboxgl from 'mapbox-gl';

import * as selectors from '@smart/modules/apartment/state/apartment.selectors';
import { MapService } from '@smart/core/services';
import { mapStyle } from '@smart/shared/helpers/utils';

import { environment } from '@env/environment';
import { ApartmentState } from '../../state/apartment.state';
import { MAP_LAYERS } from '@smart/shared/helpers/commons';

@Component({
  selector: 'smart-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() sidenavState: any;
  @Output() openSidenavClick: EventEmitter<any> = new EventEmitter<any>();

  mapPins: any = [];
  map: mapboxgl.Map;
  style = mapStyle;
  zoom = 12.2;
  source: any;
  markerElements: any = [];
  mapLoaded: boolean = false;
  subscription: Subscription = new Subscription();
  screenWidth: number = 0;
  activeQuery: any;

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenWidth = window.innerWidth;
  }

  constructor(
    private mapService: MapService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private store: Store<ApartmentState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.onResize();
    this.subscription.add(
      this.store
        .select(selectors.selectApartmentState)
        .subscribe((data: ApartmentState) => {
          if (
            data &&
            data.apartmentList &&
            data.apartmentList?.records &&
            this.mapLoaded &&
            data.productId == -1
          ) {
            this.mapPins = [...data.apartmentList.records];
            this.zoom = 16;
            this.loadMapWithMarkers();
            this.cd.markForCheck();
          } else if (data.productId && data.apartmentItem && this.mapLoaded) {
            this.mapPins = [];
            this.zoom = 16;

            this.mapPins.push(data?.apartmentItem);
            this.zoomToMarker();
            this.cd.detectChanges();
          }

          if (data.productId && data.apartmentItem) {
            this.mapPins = [];
            this.zoom = 16;
            this.mapPins.push(data?.apartmentItem);
            this.zoomToMarker();
          }
        })
    );
  }

  ngOnInit() {
    this.store
      .pipe(select(selectors.getApartmentsData()))
      .subscribe((response) => {
        if (response?.length > 1) {
          this.mapPins = [...response];
          this.buildMap();
          this.cd.detectChanges();
        }
      });

    this.getQueryParams();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: this.getMapCenterCoordinates(),
      scrollZoom: true,
    });

    this.map.on('load', (event) => {
      const markersPins: any = this.convertMapPinsToMarkers(this.mapPins);

      this.addSource(markersPins);

      this.source = this.map?.getSource('SmartDataApartments');

      this.addLayers();

      this.mapLoaded = true;
      this.loadMapWithMarkers();
    });
  }

  addSource(markersPins: any) {
    this.map?.addSource('SmartDataApartments', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: markersPins,
      },
    });
  }

  addLayers() {
    this.map?.addLayer(MAP_LAYERS);
  }

  convertMapPinsToMarkers(mapPins: any[]) {
    return this.mapService.convertPinsToMarker(mapPins);
  }

  loadMapWithMarkers() {
    // DELETE ALL MARKERS
    this.markerElements.forEach((markerToRemove: any) => {
      let markerPinLayer: any = document.getElementById(
        markerToRemove.propertyid
      );
      try {
        markerPinLayer.remove();
      } catch (e) {}
    });

    this.markerElements = [];

    // 1) ADD MARKER TO MAP
    const bounds = [];
    this.mapPins.forEach((marker: any) => {
      bounds.push(
        new mapboxgl.LngLat(marker.geocode.Longitude, marker.geocode.Latitude)
      );

      // 2) CREATE MARKER LAYER
      let markerElt: any = document.createElement('div');

      markerElt = this.mapService.createMapLayerOnMap(marker, markerElt);

      // 3) CREATE CUSTOM MARKER HTML & POPUP
      const markerElement = this.mapService.createCustomMarkerAndPopup(
        markerElt,
        marker,
        this.map,
        this.markerElements
      );

      // 4) EVENT WHEN MARKER IS CLICKED
      markerElement.getElement().addEventListener('click', (event: any) => {
        this.mapService.markerClicked(
          event,
          this.map,
          markerElement,
          this.router
        );
      });

      // 5) CHANGE COLOR OF SELECTED MARKER ON RELOAD
      if (this.mapPins.length == 1) {
        if (this.activeQuery?.propertyId == marker.propertyID) {
          markerElt.style.backgroundImage = marker?.favorite
            ? 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-blue-heart.svg)'
            : 'url(https://my.smartapartmentdata.com/assets/images/pin/pin-blue.svg)';
        }
      }
    });

    this.map.flyTo({
      center: this.getMapCenterCoordinates(),
      essential: true,
      zoom: 12.2,
    });
  }

  getMapCenterCoordinates() {
    return this.mapService.getMapCenter(this.mapPins);
  }

  zoomToMarker() {
    this.mapService.zoomIntoSelectedMarker(
      this.mapPins,
      this.markerElements,
      this.map
    );
  }

  getQueryParams() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.activeQuery = { ...params };
      })
    );
  }

  closeSidenav() {
    this.openSidenavClick.emit('close');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
