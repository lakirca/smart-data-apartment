import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  NavigationEnd,
  Event,
} from '@angular/router';

import * as maplibre from 'maplibre-gl';

import { Subscription } from 'rxjs';

import { MapService } from '@smart/core/services';

import { getFavourites, mapStyle } from '@smart/shared/helpers/utils';
import {
  MAPTILER_API_KEY,
  MAPTILER_MAP_STYLE,
  MAP_LAYERS,
} from '@smart/shared/helpers/commons';

import { ApartmentItem } from '@smart/shared/models/apartment-item.model';
import { MapPoint } from '@smart/shared/models/map-point.model';

@Component({
  selector: 'smart-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnChanges, OnDestroy {
  @Input() sidenavState: any;
  @Input() currentApartment: ApartmentItem;
  @Input() mapPoints: MapPoint[];
  @Input() markerElements: ApartmentItem[] = [];

  @Output() openSidenavClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeApartmentItem: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  subscription: Subscription = new Subscription();

  style = mapStyle;
  screenWidth: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenWidth = window.innerWidth;
  }

  constructor(
    private mapService: MapService,
    private router: Router,
    private activatedRotuer: ActivatedRoute
  ) {
    this.onResize();

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate' && event.url === '/') {
          this.removeApartmentItem.emit(this.currentApartment);
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const mapPoints = changes['mapPoints'];

    if (
      mapPoints?.currentValue &&
      mapPoints?.previousValue !== mapPoints?.currentValue
    ) {
      this.subscription.add(
        this.activatedRotuer.queryParams.subscribe((params: any) => {
          if (!this.mapService.map) {
            if (params.propertyID) {
              const points = this.mapPoints.find(
                (p: any) =>
                  p.properties.propertyID.toString() ===
                  params.propertyID.toString()
              );

              this.mapService.map
                ? this.mapService.flyToMarker(points)
                : this.buildMap(points?.geocode);
            } else {
              this.buildMap();
            }
          }
        })
      );
    }
  }

  buildMap(points?: any) {
    this.mapService.map = new maplibre.Map({
      zoom: points ? 16 : 9,
      center: points
        ? [points.Longitude, points.Latitude]
        : this.getMapCenterCoordinates(this.mapPoints),
      scrollZoom: true,
      container: this.mapContainer.nativeElement,
      style: `${MAPTILER_MAP_STYLE}?key=${MAPTILER_API_KEY}`,
      interactive: true,
    });

    this.mapService.map.addControl(
      new maplibre.NavigationControl(),
      'top-right'
    );
    this.mapService.map.on('load', (map) => {
      this.addSource(this.mapPoints);
      this.addLayers();

      this.loadMapWithMarkers();
    });
  }

  addSource(markersPins: any) {
    this.mapService.map.addSource(MAP_LAYERS.id, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: markersPins,
      },
    });
  }

  addLayers() {
    this.mapService.map?.addLayer(MAP_LAYERS);
  }

  loadMapWithMarkers() {
    this.mapService.loadMapWithMarkers(this.markerElements, this.router);
  }

  getMapCenterCoordinates(mapPoints: any) {
    return this.mapService.getMapCenter(mapPoints);
  }

  closeSidenav() {
    this.openSidenavClick.emit('close');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
