import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'map-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  private debounceTimer?: NodeJS.Timeout;
  private placesS = inject(PlacesService)

  onQueryChange(query: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.placesS.getQuery(query)
    }, 350);
  }
}
