import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  /**
   * Get FAVORITES FROM LOCALSTORAGE
   * @returns FAVORITES
   */
  getFavourities() {
    const favourites: any = localStorage.getItem('favourites');
    const favoritesList = JSON.parse(favourites);
    return favoritesList;
  }

  /**
   * SAVE FAVORITES TO LOCALSTORAGE
   * @param list FAVORITE ITEM
   */
  saveFavoritesToLocalStorage(list: any) {
    let favoriteList = [];
    const favourites: any = localStorage.getItem('favourites');
    favoriteList = JSON.parse(favourites) || [];
    favoriteList.push(list);

    const uniqueFavouriteList = this.removeDuplicate(favoriteList);
    localStorage.setItem('favourites', JSON.stringify(uniqueFavouriteList));
  }

  /**
   * REMOVE DUPLICATE BY FILTERING FAVORITES DATA BASED UPON propertyID
   * @param list
   * @returns
   */
  removeDuplicate(list: any) {
    const favApartments = Array.from(
      new Set(list.map((item: any) => item.propertyID))
    ).map((propertyID) => {
      return list.find((a: any) => a.propertyID === propertyID);
    });

    return favApartments;
  }

  /**
   * GET FAVORITES LIST BY propertyID
   * @param propertyID
   * @returns CURRENT FAVORITES ITEM
   */
  getFavoritesListById(propertyID: any) {
    const favoritesList = this.getFavourities();
    const favorites = favoritesList?.filter(
      (list: any) => list.propertyID == +propertyID
    );
    return favorites;
  }

  /**
   * REMOVE FAVORITES FROM LOCALSTORAGE BASED UPON propertyID
   * @param propertyID
   */
  removeFavoritesItemById(propertyID: any) {
    const favoritesList = this.getFavourities();
    if (favoritesList?.length) {
      const index = favoritesList?.findIndex(
        (item: any) => item.propertyID == propertyID
      );

      if (index > -1) {
        favoritesList.splice(index, 1);
      }

      const newFavorites = [...favoritesList];

      localStorage.setItem('favourites', JSON.stringify(newFavorites));
    }
  }
}
