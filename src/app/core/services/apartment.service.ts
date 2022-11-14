import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor(private http: HttpClient) {}

  getApartmentList(): Observable<any> {
    return this.http.get(
      'list/json/listItems.aspx?listID=7892483&token=88F93B7524A50EAE7F9682C08C2623FCD6AC1592&receipt=undefined'
    );
  }

  getApartmentById(propertyID: number): Observable<any> {
    return this.http.get(
      'list/json/propertyItem.aspx?listID=7892483&token=88F93B7524A50EAE7F9682C08C2623FCD6AC1592&propertyID=' +
        propertyID
    );
  }
}
