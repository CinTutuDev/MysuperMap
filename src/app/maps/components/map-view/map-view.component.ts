import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { PlacesService, MapService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  private placesS = inject(PlacesService);

  private mapS = inject(MapService);

  ngAfterViewInit(): void {
    if (!this.placesS.useLocation) throw Error('No hay placesS.useLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesS.useLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup().setHTML(
      '<h1>Aquí me encuentro!</h1><span>Estoy en este lugar del mundo👋 </span>'
    );

    new Marker({ color: 'red' })
      .setLngLat(this.placesS.useLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapS.setMat(map);
  }
}
