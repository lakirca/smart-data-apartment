import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ApartmentStoreEffects } from '@smart/modules/apartment/state/apartment.effects';
import { reducer } from '@smart/modules/apartment/state/apartment.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('apartment', reducer),
    EffectsModule.forFeature([ApartmentStoreEffects]),
  ],
  providers: [ApartmentStoreEffects],
})
export class ApartmentStoreModule {}
