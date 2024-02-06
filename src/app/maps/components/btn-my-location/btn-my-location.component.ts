import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'map-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss'],
})
export class BtnMyLocationComponent {
  private mapS = inject(MapService);
  private placseS = inject(PlacesService);

  public goToMyLocation() {
    if (!this.placseS.isUserLocationReady)
      throw Error('No hay ubicación del usuario');
    if (!this.mapS.isMapReady) throw Error('No hay mapa disponible');

    this.mapS.flyTo(this.placseS.useLocation!);

    console.log('Ir a mi ubi');
  }
}
