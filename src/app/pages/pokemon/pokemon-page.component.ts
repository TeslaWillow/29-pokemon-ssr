import { Component, inject, OnInit } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';


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

  constructor(){}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 1000);
    this.loadPokemons();
  }

  public loadPokemons( page = 0 ): void {
    this._pokemon.loadPage(page).subscribe({
      next: (p) => { console.log(p); },
      error: (e) => { console.error(e); }
    });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

}
