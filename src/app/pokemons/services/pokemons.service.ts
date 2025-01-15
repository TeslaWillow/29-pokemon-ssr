import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokeAPIResponce, SimplePokemon } from '../interfaces';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private _http = inject(HttpClient);


  public loadPage( page: number ): Observable<SimplePokemon[]> {

    if( page !== 0 ){ --page; } // 1 = 0

    page = Math.max(0, page);

    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${ page * 20 }&limit=20`;

    return this._http.get<PokeAPIResponce>(url).pipe(
      map( ({ results }) => {
        const simplePokemons: SimplePokemon[] = results.map((p) => (
          {
            id: p.url.split('/').at(-2) ?? '',
            name: p.name,
          }
        ));
        return simplePokemons;
      })
    );

  }


}
