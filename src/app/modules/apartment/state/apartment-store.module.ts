import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './apartment.reducer';
import { ApartmentStoreEffects } from './apartment.effects';
import { EffectsModule } from '@ngrx/effects';

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
