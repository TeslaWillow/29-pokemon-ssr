import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';


@Component({
  selector: 'app-pokemon-page',
  imports: [ PokemonListComponent, PokemonListSkeletonComponent ],
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
  private _router = inject(Router);
  private _title = inject(Title);
  public pokemons  = signal<SimplePokemon[]>([]);

  private _route = inject(ActivatedRoute);
  public currentPage = toSignal<number>(
    this._route.queryParamMap.pipe(
      map( params => params.get('page') ?? '1' ),
      map( page => ( isNaN(+page) ? 1 : +page )),
      map( page => ( Math.max(1, page) )),
    )
  );

  constructor(){}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 1000);

    console.log( this.currentPage() );
    this.loadPokemons();
  }

  public loadPokemons( page = 0 ): void {

    const pageToLoad = this.currentPage()! + page;

    this._pokemon.loadPage(pageToLoad)
      .pipe(
        tap(() => this._router.navigate([], {queryParams: { page: pageToLoad }}) ),
        tap(() => this._title.setTitle(`Pokemon SSR - Page ${this.currentPage()}`))
      )
      .subscribe({
        next: (pokemons) => { this.pokemons.set(pokemons); },
        error: (e) => { console.error(e); }
      });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

}
