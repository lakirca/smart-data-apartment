import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  Event,
} from '@angular/router';
import { Store } from '@ngrx/store';
import {
  loadApartmentList,
  removeApartmentItem,
} from './state/apartment.actions';
import { ApartmentState } from './state/apartment.state';

@Component({
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss'],
})
export class ApartmentComponent implements OnInit {
  constructor(private store: Store<ApartmentState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(loadApartmentList());

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.store.dispatch(removeApartmentItem());
          this.router.navigate(['/']);
        }
      }
    });
  }
}
