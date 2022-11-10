import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentComponent } from '@smart/modules/apartment/apartment.component';
import { SidenavComponent } from '@smart/modules/apartment/components/sidenav/sidenav.component';
import { MapComponent } from '@smart/modules/apartment/components/map/map.component';
import { ApartmentListItemComponent } from '@smart/modules/apartment/components/apartment-list-item/apartment-list-item.component';
import { ApartmentListComponent } from '@smart/modules/apartment/components/apartment-list/apartment-list.component';
import { GalleryComponent } from '@smart/modules/apartment/components/gallery/gallery.component';
import { OverviewComponent } from '@smart/modules/apartment/components/overview/overview.component';
import { PlansComponent } from '@smart/modules/apartment/components/plans/plans.component';

import { ApartmentStoreModule } from '@smart/modules/apartment/state';
import { ApartmentRoutingModule } from '@smart/modules/apartment/apartment-routing.module';
import { SharedModule } from '@smart/shared/shared.module';

@NgModule({
  declarations: [
    ApartmentComponent,
    GalleryComponent,
    SidenavComponent,
    PlansComponent,
    OverviewComponent,
    ApartmentListComponent,
    ApartmentListItemComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    ApartmentStoreModule,
    SharedModule,

  ],
})
export class ApartmentModule {}
