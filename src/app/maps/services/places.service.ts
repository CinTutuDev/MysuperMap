import { Injectable, inject } from '@angular/core';
import { Feature, Places } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private placesApi = inject(PlacesApiClient);
  private mapS = inject(MapService);

  public useLocation: [number, number] | undefined;

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización');
          console.log(err);
          reject();
        }
      );
    });
  }

  getQuery(query: string = '') {
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;

      return;
    }
    if (!this.useLocation) throw Error('No hya userLocation');

    this.isLoadingPlaces = true;
    this.placesApi
      .get<Places>(`/${query}.json?`, {
        params: {
          proximity: this.useLocation.join(','),
        },
      })
      .subscribe((resp) => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapS.createMarkersFromPlaces(this.places, this.useLocation!);
      });
  }

  deletePlaces() {
    this.places = [];
  }
}
