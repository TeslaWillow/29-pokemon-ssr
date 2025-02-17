
import { TestBed } from "@angular/core/testing";
import { PokemonsService } from "./pokemons.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { PokeAPIResponce, SimplePokemon } from "../interfaces";
import { catchError } from "rxjs";


const mockPokeApiResponce: PokeAPIResponce = {
  "count": 1304,
  "next": "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
  "previous": null,
  "results": [
      {
          "name": "bulbasaur",
          "url": "https://pokeapi.co/api/v2/pokemon/1/"
      },
      {
          "name": "ivysaur",
          "url": "https://pokeapi.co/api/v2/pokemon/2/"
      },
      {
          "name": "venusaur",
          "url": "https://pokeapi.co/api/v2/pokemon/3/"
      },
  ]
};

const expectedPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
  {
    id: '3',
    name: 'venusaur',
  },
];

const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonsService', () => {

  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Close all http connections
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', () => {
    service.loadPage(1).subscribe({
      next: (pokemons) => {
        expect(pokemons).toEqual(expectedPokemons);
      }
    });
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`;

    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponce); // Send manuany
  });

  it('should load a page 5 of SimplePokemons', () => {
    service.loadPage(5).subscribe({
      next: (pokemons) => {
        expect(pokemons).toEqual(expectedPokemons);
      }
    });
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=80&limit=20`;

    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponce); // Send manuany
  });

  it('should load pokemon By Id', () => {

    const pokemonId = '1';

    service.loadPokemon(pokemonId).subscribe({
      next: (pokemon: any) => {
        expect(pokemon).toEqual(mockPokemon);
      }
    });

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon); // Send manuany
  });

  it('should load pokemon By Name', () => {

    const pokemonName = 'bulbasaur';

    service.loadPokemon(pokemonName).subscribe({
      next: (pokemon: any) => {
        expect(pokemon).toEqual(mockPokemon);
      }
    });

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon); // Send manuany
  });

  it('should catch error if pokemon not found', () => {

    const pokemonName = 'not-found';
    const notFoundMessage = 'Not found pokemon';

    service.loadPokemon(pokemonName)
      .pipe(
        catchError((error) => {
          expect(error.message).toContain(notFoundMessage);
          return [];
        }
      ))
      .subscribe();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    req.flush(notFoundMessage, {
      status: 404,
      statusText: 'Not Found',
    }); // Send manuany
  });

});


