import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';


@Component({
  selector: 'app-pokemon-page',
  imports: [ PokemonListComponent ],
  templateUrl: './pokemon-page.component.html',
  styles: ``
})
export default class PokemonPageComponent implements OnInit {

  // public isLoading = signal<boolean>(true);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe( isStable => {
  //   console.log({ isStable });
  // });

  private _pokemon = inject(PokemonsService);
  public pokemons  = signal<SimplePokemon[]>([]);

  constructor(){}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 1000);
    this.loadPokemons();
  }

  public loadPokemons( page = 0 ): void {
    this._pokemon.loadPage(page).subscribe({
      next: (pokemons) => { this.pokemons.set(pokemons); },
      error: (e) => { console.error(e); }
    });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

}
