import { Component } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-list',
  imports: [ PokemonCardComponent ],
  templateUrl: './pokemon-list.component.html',
  styles: ``
})
export class PokemonListComponent {

}
