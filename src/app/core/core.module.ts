import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapService } from '@smart/core/services/map.service';
import { ApartmentService } from '@smart/core/services/apartment.service';

@NgModule({
  imports: [CommonModule],
  providers: [ApartmentService, MapService],
})
export class CoreModule {}
