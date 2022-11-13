import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { select, Store } from '@ngrx/store';

import * as maplibre from 'maplibre-gl';

import * as selectors from '@smart/modules/apartment/state/apartment.selectors';
import { MapService } from '@smart/core/services';
import {
  getFavourites,
  mapStyle,
  parseMapPoints,
} from '@smart/shared/helpers/utils';

import { environment } from '@env/environment';
import { ApartmentState } from '../../state/apartment.state';
import {
  MAPTILER_API_KEY,
  MAPTILER_MAP_STYLE,
  MAP_LAYERS,
} from '@smart/shared/helpers/commons';

@Component({
  selector: 'smart-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() sidenavState: any;
  @Output() openSidenavClick: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  mapPins: any = [];

  map: maplibre.Map;
  style = mapStyle;
  zoom = 9;
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
            this.mapPins = parseMapPoints(data.apartmentList.records);
            this.markerElements = data.apartmentList.records;

            this.zoom = 16;
            this.loadMapWithMarkers();
            this.cd.markForCheck();
          } else if (data.productId && data.apartmentItem && this.mapLoaded) {
            this.mapPins = [];
            this.zoom = 16;

            const newPins = [];
            newPins.push(data?.apartmentItem);
            this.markerElements = newPins;
            this.mapPins = parseMapPoints(newPins);

            this.zoomToMarker();
            this.cd.detectChanges();
          }

          if (data.productId && data.apartmentItem) {
            this.mapPins = [];
            this.zoom = 16;
            const newPins = [];
            newPins.push(data?.apartmentItem);
            this.markerElements = newPins;
            this.mapPins = parseMapPoints(newPins);

            this.zoomToMarker();
          }
        })
    );
  }

  ngAfterViewInit() {
    this.store
      .pipe(select(selectors.getApartmentsData()))
      .subscribe((response) => {
        if (response?.length > 1) {
          this.mapPins = parseMapPoints(response);
          this.markerElements = response;

          this.buildMap();
          this.cd.detectChanges();
        }
      });

    this.getQueryParams();
  }

  buildMap() {
    this.map = new maplibre.Map({
      zoom: this.zoom,
      center: this.getMapCenterCoordinates(),
      scrollZoom: true,
      container: this.mapContainer.nativeElement,
      style: `${MAPTILER_MAP_STYLE}?key=${MAPTILER_API_KEY}`,
      interactive: true,
    });

    this.map.addControl(new maplibre.NavigationControl(), 'top-right');
    this.map.on('load', (map) => {
      const markersPins: any = parseMapPoints(this.mapPins);

      this.addSource(markersPins);

      this.source = this.map?.getSource(MAP_LAYERS.id);

      this.addLayers();

      this.loadMapWithMarkers();

      this.mapLoaded = true;
    });
  }

  addSource(markersPins: any) {
    this.map?.addSource(MAP_LAYERS.id, {
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
    this.markerElements.forEach((marker: any) => {
      let markerElt: any = document.createElement('div');
      markerElt = this.mapService.createMapLayerOnMap(marker, markerElt);

      const markerElement = this.mapService.createCustomMarkerAndPopup(
        markerElt,
        marker,
        this.map
      );

      markerElement.getElement().addEventListener('click', (event: any) => {
        this.mapService.markerClicked(
          event,
          this.map,
          markerElement,
          this.router
        );
      });

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
      zoom: 9,
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
