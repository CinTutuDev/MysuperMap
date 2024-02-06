import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'map-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {

  private placesS = inject(PlacesService);
  private mapS = inject(MapService);

  public selecterId: string = '';

  get isLoadingPlaces(): boolean {
    return this.placesS.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesS.places;
  }

  flyTO(place: Feature) {
    this.selecterId = place.id;
    const [lng, lat] = place.center;
    this.mapS.flyTo([lng, lat]);
  }

  getDirections( place: Feature ) {
    if ( !this.placesS.useLocation ) throw Error('No hay userLocation');


    this.placesS.deletePlaces();

    const start = this.placesS.useLocation;
    const end = place.center as [number, number];



    this.mapS.getRouteBetweenPoints(start, end);
  }

}
