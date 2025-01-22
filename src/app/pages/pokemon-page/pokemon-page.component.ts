import { Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  styles: ``
})
export default class PokemonPageComponent implements OnInit {

  private _pokemonService = inject(PokemonsService);
  private _route = inject(ActivatedRoute);
  private _title = inject(Title);
  private _meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');

    if(!id) return;

    this._pokemonService.loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          this._title.setTitle(`Pokemon: #${id} - ${name}`);
          this._meta.updateTag({ name: 'description', content: `Página dePokemon: ${name}` });
          this._meta.updateTag({ name: 'og:title', content: `Pokemon: ${name}` });
          this._meta.updateTag({ name: 'og:description', content: `Página dePokemon: ${name}` });
          this._meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` });
        })
      )
      .subscribe(
      (pokemon) => {
        this.pokemon.set(pokemon);
      }
    );

  }

}
