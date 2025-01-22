import { Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styles: ``
})
export default class PokemonPageComponent implements OnInit {

  private _pokemonService = inject(PokemonsService);
  private _route = inject(ActivatedRoute);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');

    if(!id) return;

    this._pokemonService.loadPokemon(id).subscribe(
      (pokemon) => {
        this.pokemon.set(pokemon);
      }
    );

  }

}
