import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokeAPIResponce, Pokemon, SimplePokemon } from '../interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';

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

  public loadPokemon( id: string ): Observable<Pokemon> {
    return this._http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        catchError(this._handleError)
      );
  }

  private _handleError( error: HttpErrorResponse ) {
    if( error.status === 0 ){
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }

    const errorMessage = error.error ?? 'An error occurred';
    return throwError(()=> new Error(errorMessage));
  }


}
