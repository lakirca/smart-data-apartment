import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  endpoint: string = 'https://app.smartapartmentdata.com/';

  constructor(private http: HttpClient) {}

  /**
   * GET APRTMENT LIST ( PROPERTY )
   * @returns APARTMENT LIST AS OBSEVABLE
   */
  getApartmentList(): Observable<any> {
    return this.http.get(
      this.endpoint +
        'list/json/listItems.aspx?listID=7892483&token=88F93B7524A50EAE7F9682C08C2623FCD6AC1592&receipt=undefined'
    );
  }

  /**
   * GET APARTMENT BY ID
   * @param propertyId PROPERTYID
   * @returns APARTMENT LIST ITEM
   */
  getApartmentById(propertyId: number): Observable<any> {
    return this.http.get(
      this.endpoint +
        'list/json/propertyItem.aspx?listID=7892483&token=88F93B7524A50EAE7F9682C08C2623FCD6AC1592&propertyID=' +
        propertyId
    );
  }
}
