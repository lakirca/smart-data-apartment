import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'smart-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  activeQuery: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  
  ngOnInit(): void {
    this.getQueryParams();
  }

  /**
   * GET QUERY PARAMS
   */
  getQueryParams() {
    this.subscription.add(
      this.activatedRoute.queryParams.subscribe((params) => {
        this.activeQuery = { ...params };
        console.log(this.activeQuery);

      })
    );
  }

  /**
   * TOGGLE SIDENAV BASED UPON EVENT
   * @param event OUTPUT EVENT
   * @param sidenav SIDENAV
   */
  toggleSidenav(event: any, sidenav: any) {
    if (event) {
      sidenav.toggle();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
