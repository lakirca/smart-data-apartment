import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from '@smart/app-routing.module';
import { SharedModule } from '@smart/shared/shared.module';

import { AppComponent } from '@smart/app.component';

import { environment } from '@env/environment';
import { CoreModule } from './core/core.module';
import { ApartmentStoreModule } from './modules/apartment/state';
import { APIInterceptor } from './core/interceptors/api.interceptor';

export const metaReducers: MetaReducer<any>[] = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
    }),
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ApartmentStoreModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: APIInterceptor,
     multi: true
    }
   ]
})
export class AppModule {}
