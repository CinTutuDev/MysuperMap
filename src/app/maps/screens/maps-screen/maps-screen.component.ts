import { Component, OnInit, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'map-maps-screen',
  templateUrl: './maps-screen.component.html',
  styleUrls: ['./maps-screen.component.scss'],
})
export class MapsScreenComponent implements OnInit {
  public placesS = inject(PlacesService);

  get isUserLocationReady() {
    return this.placesS.isUserLocationReady;
  }

  ngOnInit(): void {}
}
