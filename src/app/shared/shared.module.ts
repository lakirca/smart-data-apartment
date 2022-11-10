import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@smart/shared/material/material.module';
import { FilterBedroomItemPipe } from '@smart/shared/pipes/filter-bedroom-item.pipe';
import { FilterBedroomsPipe } from '@smart/shared/pipes/filter-bedrooms.pipe';
import { FilterPriceItemPipe } from '@smart/shared/pipes/filter-price-item.pipe';
import { CommonService } from '@smart/shared/services/common.service';
import { ImageWizardComponent } from '@smart/shared/components/image-wizard/image-wizard.component';
import { FilterPricePipe } from './pipes/filter-price.pipe';
import { FlexModule } from '@angular/flex-layout';

const Modules = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  CommonModule,
  NgImageFullscreenViewModule,
  NgImageFullscreenViewModule,
  RouterModule,
  FlexModule
];

const Pipes = [
  FilterBedroomsPipe,
  FilterBedroomItemPipe,
  FilterPriceItemPipe,
  FilterPricePipe,
  FilterBedroomsPipe,
  FilterBedroomItemPipe,
  FilterPriceItemPipe,
  FilterPricePipe,
];

@NgModule({
  declarations: [ImageWizardComponent, ...Pipes],
  imports: [...Modules],
  exports: [...Modules, ...Pipes, ImageWizardComponent],
  providers: [CommonService],
})
export class SharedModule {}
